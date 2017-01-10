// Copyright (c) 2016, Climbforce FZC and contributors
// For license information, please see license.txt

frappe.ui.form.on('Hamriyah Customs', {
	refresh: function(frm) {

	}
});

//fetch arabic name from arabic_name to customer_ar
frappe.ui.form.on("Hamriyah Customs", "customer", function(frm, cdt, cdn){
frappe.call({
       "method": "frappe.client.get_value",
			 args: {
	 		 				doctype: "Customer",
	 						fieldname: "arabic_name",
	 						filters: {
	 						name:["=", frm.doc.customer]
											 }
  			 			},
			 callback: function (data) {
			 console.log(data);
						 cur_frm.set_value("customer_ar", data.message.arabic_name);
							 }
			})

});

//fetch arabic address from arabic_address to address_ar
frappe.ui.form.on("Hamriyah Customs", "customer", function(frm, cdt, cdn){
frappe.call({
       "method": "frappe.client.get_value",
			 args: {
	 		 				doctype: "Customer",
	 						fieldname: "arabic_address",
	 						filters: {
	 						name:["=", frm.doc.customer]
											 }
  			 			},
			 callback: function (data) {
			 console.log(data);
						 cur_frm.set_value("address_ar", data.message.arabic_address);
							 }
			})

});

//fetch child table from Delivery Note Item to Hamriyah Customs Item (item_code & qty)
frappe.ui.form.on("Hamriyah Customs", "delivery_note", function(frm) {
frappe.model.with_doc("Delivery Note", frm.doc.delivery_note, function() {
var tabletransfer= frappe.model.get_doc("Delivery Note", frm.doc.delivery_note)
$.each(tabletransfer.items, function(index, row){
d = frm.add_child("items");
d.item_code = row.item_code;
d.qty = row.qty;
cur_frm.refresh_field("items");
})
});
});

/*//fetch net_weight from item to unit_weight
frappe.ui.form.on("Hamriyah Customs Item","fetch_info", function(frm){
frm.add_fetch("item_code","net_weight","unit_weight");
frm.add_fetch("item_code","description_ar","description");
refresh_field("items");
});*/
/*frappe.ui.form.on("Hamriyah Customs Item", "get_info", function(frm, cdt, cdn){
frappe.call({
       "method": "frappe.client.get_value",
			 args: {
	 		 				doctype: "Item",
	 						fieldname: "net_weight",
	 						filters: {
	 						name:["=", frm.doc.item_code]
											 }
  			 			},
			 callback: function (data) {
			 console.log(data);
						 cur_frm.set_value("unit_weight", data.message.net_weight);
							 }
			})

});*/

//Calculate weight per line (unit_weight*qty) recalculate when unit_weight changes
frappe.ui.form.on("Hamriyah Customs Item", "unit_weight", function(frm, doctype, name) {
var row = locals[doctype][name];
row.weight_kg = row.unit_weight * row.qty;
refresh_field("items");
});
//Calculate weight per line (unit_weight*qty) recalculate when qty changes
frappe.ui.form.on("Hamriyah Customs Item", "qty", function(frm, doctype, name) {
var row = locals[doctype][name];
row.weight_kg = row.unit_weight * row.qty;
refresh_field("items");
});
//Calculate amount per line (weight_kg*price_per_kg) recalculate when weight_kg changes
frappe.ui.form.on("Hamriyah Customs Item", "weight_kg", function(frm, doctype, name) {
var row = locals[doctype][name];
row.amount = row.price_per_kg * row.weight_kg;
refresh_field("items");
});
//Calculate amount per line (weight_kg*price_per_kg) recalculate when price_per_kg changes
frappe.ui.form.on("Hamriyah Customs Item", "price_per_kg", function(frm, doctype, name) {
var row = locals[doctype][name];
row.amount = row.price_per_kg * row.weight_kg;
refresh_field("items");
});
//Calculate amount per line (weight_kg*price_per_kg) recalculate when item_code changes
frappe.ui.form.on("Hamriyah Customs Item", "item_code", function(frm, doctype, name) {
var row = locals[doctype][name];
row.amount = row.price_per_kg * row.weight_kg;
refresh_field("items");
});

//calculate total qty
frappe.ui.form.on("Hamriyah Customs", "validate", function(frm,doc) {
     var total = 0
     $.each(frm.doc["items"] || [], function(i, d) {
         total += d.qty
     });
     frm.set_value('sum_qty', total);
});
//calculate total weight_kg
frappe.ui.form.on("Hamriyah Customs", "validate", function(frm,doc) {
     var total = 0
     $.each(frm.doc["items"] || [], function(i, d) {
         total += d.weight_kg
     });
     frm.set_value('sum_weight_kg', total);
});
//calculate total amount
frappe.ui.form.on("Hamriyah Customs", "validate", function(frm,doc) {
     var total = 0
     $.each(frm.doc["items"] || [], function(i, d) {
         total += d.amount
     });
     frm.set_value('sum_amount', total);
});
