"use strict";

var conf = module.exports;


// FAHRZEUGE
conf.sys_veh = new Array(500);
conf.veh_params = new Array(500);

conf.sys_key = new Array(500);
conf.key_params = new Array(500);

conf.sys_atms = new Array(500);
conf.atms_params = new Array(500);
// FAHRZEUGE

// GARAGE
conf.sys_garage = new Array(500);
conf.garage_params = new Array(500);
// GARAGE

// FAHRZEUGE
for(let i = 0; i <conf.veh_params.length; i++) {
    conf.veh_params[i] = {};
  }
  for(let i = 0; i <conf.key_params.length; i++) {
    conf.key_params[i] = {};
  }
  // FAHRZEUGE


  // GARAGE
  for(let i = 0; i <conf.garage_params.length; i++) {
    conf.garage_params[i] = {};
  }
   // GARAGE

     // ATM
  for(let i = 0; i <conf.atms_params.length; i++) {
    conf.atms_params[i] = {};
  }
   // ATM