import express from "express";
import { addService, getAllServices, updateService, updateServiceStars,updateServicePaid, getAllServicesDoneByUser, getAllServicesPaidByJobOfferedId,getAllServicesByJobOfferedId, getAllServicesDoneByJobOfferedId, updateServiceDone } from "../service/ServiceServices.js";

const router = express.Router();

/** 
 * Lista los servicios de la base
*/
router.get('/all', (req, res) => {
  getAllServices(res);
})

/** 
 * Lista los servicios de un determinado trabajo ofrecido
*/
router.get('/:job_offered_id', (req, res) => {
  getAllServicesByJobOfferedId(req, res);
})

/** 
 * Lista los servicios terminados de un determinado trabajo ofrecido
*/
router.get('/done/:job_offered_id', (req, res) => {
  getAllServicesDoneByJobOfferedId(req, res);
})

/** 
 * Añade un servicio
*/
router.post('/add', (req, res) => {
  addService(req, res);
})

/** 
 * Actualiza el estado de un servicio
*/
router.put('/status/:service_id/:done', (req, res) => {
  updateServiceDone(req, res);
})