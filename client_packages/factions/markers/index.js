let markerone;
let markertwo;
let markerthree;
let markerfour;
let markerfive;

mp.events.add("client:faction:delmarkers", () => {
	markerone.destroy();
	markertwo.destroy();
	markerfour.destroy();
	markerfive.destroy();
});
mp.events.add("LoadFactionDutyMarkers", (x,y,z) => {
	
	markerone = mp.markers.new(27, new mp.Vector3(x,y,z-0.97), 0.5, 
	{ 
		direction: new mp.Vector3(x,y,z), 
		rotation: 0, 
		color: [ 0, 0, 160, 255],
		visible: true,
		dimension: 0 
	});
	
});
mp.events.add("LoadFactionClothesMarkers", (x,y,z) => {
	
	markertwo = mp.markers.new(27, new mp.Vector3(x,y,z-0.97), 0.5, 
	{ 
		direction: new mp.Vector3(x,y,z), 
		rotation: 0, 
		color: [ 0, 0, 160, 255],
		visible: true,
		dimension: 0 
	});
});
mp.events.add("LoadFactionEquipMarkers", (x,y,z) => {
	markerfour = mp.markers.new(27, new mp.Vector3(x,y,z-0.97), 0.5, 
	{ 
		direction: new mp.Vector3(x,y,z), 
		rotation: 0, 
		color: [ 0, 0, 160, 255],
		visible: true,
		dimension: 0 
	});
});
mp.events.add("LoadFactionPCMarkers", (x,y,z) => {
	markerfive = mp.markers.new(27, new mp.Vector3(x,y,z-0.97), 0.5, 
	{ 
		direction: new mp.Vector3(x,y,z), 
		rotation: 0, 
		color: [ 0, 0, 160, 255],
		visible: true,
		dimension: 0 
	});
});
mp.events.add("LoadFactionChiefMarkers", (x,y,z) => {
	markerfive = mp.markers.new(27, new mp.Vector3(x,y,z-0.97), 0.5, 
	{ 
		direction: new mp.Vector3(x,y,z), 
		rotation: 0, 
		color: [ 0, 0, 160, 255],
		visible: true,
		dimension: 0 
	});
});
mp.events.add("LoadFactionGaragenMarkers", (x,y,z) => {
	
	markerthree = mp.colshapes.newSphere(x,y,z-0.979, 2);
	var markercol = mp.markers.new(1,new mp.Vector3(x,y,z-0.979), 2, { color: [255,255,255,100],visible: true});
});

mp.events.add("LoadFactionParkingMarkers", (x,y,z) => {
	
	markerthree = mp.colshapes.newSphere(x,y,z-0.979, 2);
	var markercol = mp.markers.new(1,new mp.Vector3(x,y,z-0.979), 2, { color: [255,255,0,100],visible: true});
});

