<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use RestServer\RestController;
require APPPATH . '/libraries/RestController.php';
require APPPATH . '/libraries/Format.php';

header('Access-Control-Allow-Origin: *');

class Api extends RestController {
    
    // function __construct() {
    //     parent::__construct();
    //     $this->load->model('DAO');
    // }

    function asistencias_get() {
        $this->load->model('DAO');

        if ($this->get('id')) {
            $asistencia = $this->DAO->seleccionar_entidad('tb_asistencias', array('id_asistencia' => $this->get('id')));

            $respuesta = array(
                "status" => '1',
                "mensaje" => "Informacion cargada correctamente",
                "datos" => $asistencia['data'],
                "errores" => array()
            );
        } else {
            $asistencias = $this->DAO->seleccionar_entidad('tb_asistencias');

            $respuesta = array(
                "status" => '1',
                "mensaje" => "Informacion cargada correctamente",
                "datos" => $asistencias['data'],
                "errores" => array()
            );
        }

        $this->response($respuesta, 200);
    }

    function asistencias_post() {
        $this->load->model('DAO');

        $this->form_validation->set_data($this->post());
        $this->form_validation->set_rules('tipo_asistencia', 'Tipo de Asistencia', 'required');
        // $this->form_validation->set_rules('foto_asistencia', 'Foto', 'callback_validar_archivo[foto]');
        $this->form_validation->set_rules('coordenadas_asistencia', 'Coordenadas', 'required');
        $this->form_validation->set_rules('fk_usuario', 'Usuario', 'required');

        if ( $this->form_validation->run() ) {
            $configuracion = array(
                'upload_path' => "./asistencias",
                'allowed_types' => '*',
                'max_size' => 2048,
                'file_ext_tolower' => TRUE,
                'encrypt_name' => TRUE
            );

            $this->load->library('upload', $configuracion);

            if($this->upload->do_upload('foto_asistencia')) {
                $nombre = $this->upload->data()['file_name'];

                $datos = array(
                    "fecha_asistencia" => $this->post('fecha_asistencia'),
                    "tipo_asistencia" => $this->post('tipo_asistencia'),
                    "foto_asistencia" => base_url()."/asistencias/".$nombre,
                    "coordenadas_asistencia" => $this->post('coordenadas'),
                    "fk_usuario" => $this->post('fk_usuario')
                );

                $respuesta = $this->DAO->insert_modificar_entidad('tb_asistencias', $datos);

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
                    "errores" => $this->upload->display_errors(),
                    "mensaje" => "Error al procesar la información",
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

    function asistencias_put() {
        $this->load->model('DAO');

        $this->form_validation->set_data($this->put());
        if ( $this->form_validation->run() ) {
            $configuracion = array(
                'upload_path' => "./asistencias",
                'allowed_types' => '*',
                'max_size' => 2048,
                'file_ext_tolower' => TRUE,
                'encrypt_name' => TRUE
            );

            $this->load->library('upload', $configuracion);

            if($this->upload->do_upload('foto')) {
                $nombre = $this->upload->data()['file_name'];

                $datos = array(
                    "tipo_asistencia" => $this->post('tipo_asistencia'),
                    "foto_asistencia" => base_url()."/asistencias/".$nombre,
                    "coordenadas_asistencia" => $this->post('coordenadas'),
                    "fk_usuario" => $this->post('fk_usuario')
                );

                $respuesta = $this->DAO->insert_modificar_entidad('tb_asistencias', $datos, array('id_asistencia' => $this->put('id_asistencia')));

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
                        "mensaje" => "Error al actualizar",
                        "datos" => array()
                    );
                }

            } else {
                $respuesta = array(
                    "status" => "0",
                    "errores" => $this->upload->display_errors(),
                    "mensaje" => "Error al procesar la información",
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

    function validar_archivo($valor, $param) {
        
        if(isset($_FILES[$param]) && $_FILES[$param] && $_FILES[$param]['name']) {
            return TRUE;
        } else {
            $this->form_validation->set_message('validar_archivo', 'El archivo es obligatorio');
            return FALSE;
        }
    }
}