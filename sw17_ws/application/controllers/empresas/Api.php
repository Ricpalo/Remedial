<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use RestServer\RestController;
require APPPATH . '/libraries/RestController.php';
require APPPATH . '/libraries/Format.php';

class Api extends RestController {
    
    // function __construct() {
    //     parent::__construct();
    //     $this->load->model('DAO');
    // }

    function empresas_get() {
        $this->load->model('DAO');

        if ($this->get('id')) {
            $empresa = $this->DAO->seleccionar_entidad('tb_empresas', array('id_empresa' => $this->get('id')), TRUE);

            $respuesta = array(
                "status" => '1',
                "mensaje" => "Informacion cargada correctamente",
                "datos" => $empresa['data'],
                "errores" => array()
            );
        } else if ($this->get('fk_usuario')) {
            $empresa = $this->DAO->seleccionar_entidad('tb_empresas', array('fk_usuario' => $this->get('fk_usuario')), TRUE);

            $respuesta = array(
                "status" => '1',
                "mensaje" => "Informacion cargada correctamente",
                "datos" => $empresa['data'],
                "errores" => array()
            );
        } else {
            $empresas = $this->DAO->seleccionar_entidad('tb_empresas');

            $respuesta = array(
                "status" => '1',
                "mensaje" => "Informacion cargada correctamente",
                "datos" => $empresas['data'],
                "errores" => array()
            );
        }

        $this->response($respuesta, 200);
    }

    function empresas_post() {
        $this->load->model('DAO');

        $this->form_validation->set_data($this->post());
        $this->form_validation->set_rules('nombre', 'Nombre', 'required');
        $this->form_validation->set_rules('telefono', 'Telefono', 'required');
        $this->form_validation->set_rules('fk_usuario', 'Usuario', 'required');

        if ( $this->form_validation->run() ) {
            $datos = array(
                "nombre" => $this->post('nombre'),
                "telefono" => $this->post('telefono'),
                "fk_usuario" => $this->post('fk_usuario'),
            );

            $respuesta = $this->DAO->insert_modificar_entidad('tb_empresas', $datos);

            if ($respuesta['status'] == '1') {
                $respuesta = array(
                    "status" => "1",
                    "mensaje" => "Registro Correcto",
                    "datos" => array(),
                    "errores" => array()
                );
            } else {
                $respuesta = array(
                    "status" => "0",
                    "errores" => array(),
                    "mensaje" => "Error al registrar",
                    "datos" => array()
                );
            }

        } else {
            $respuesta = array(
                "status" => "0",
                "errores" => $this->form_validation->error_array(),
                "mensaje" => "Error al procesar la información",
                "datos" => array()
            );
        }

        $this->response($respuesta, 200);
    }

    function empresas_put() {
        $this->load->model('DAO');

        $this->form_validation->set_data($this->put());
        $this->form_validation->set_rules('titulo', 'Titulo', 'required');
        $this->form_validation->set_rules('duracion', 'Duracion', 'required');
        $this->form_validation->set_rules('precio', 'Precio', 'required');
        $this->form_validation->set_rules('descripcion', 'Descripcion', 'required');

        if ( $this->form_validation->run() ) {
            $datos = array(
                "titulo" => $this->put('titulo'),
                "duracion" => $this->put('duracion'),
                "precio" => $this->put('precio'),
                "descripcion" => $this->put('descripcion')
            );

            $respuesta = $this->DAO->insert_modificar_entidad('tb_empresas', $datos, array('id' => $this->put('id')));

            if ($respuesta['status'] == '1') {
                $respuesta = array(
                    "status" => "1",
                    "mensaje" => "Actualizado Correcto",
                    "datos" => array(),
                    "errores" => array()
                );
            } else {
                $respuesta = array(
                    "status" => "0",
                    "errores" => array(),
                    "mensaje" => "Error al registrar",
                    "datos" => array()
                );
            }

        } else {
            $respuesta = array(
                "status" => "0",
                "errores" => $this->form_validation->error_array(),
                "mensaje" => "Error al procesar la información",
                "datos" => array()
            );
        }

        $this->response($respuesta, 200);
    }

    function empresas_delete() {
        $this->load->model('DAO');

        if ($this->input->get('id')) {
            $empresa = $this->DAO->eliminar_entidad('tb_empresas', $this->input->get('id'));

            $respuesta = array(
                "status" => "1",
                "mensaje" => "Eliminado Correcto",
                "datos" => $empresa,
                "errores" => array(),
                "id" => $this->get('id')
            );
        } else {
            $respuesta = array(
                "status" => "0",
                "mensaje" => "No llega el id",
                "datos" => array(),
                "errores" => array(),
                "id" => $this->input->get('id')
            );
        }
        
        $this->response($respuesta, 200);
    }
}