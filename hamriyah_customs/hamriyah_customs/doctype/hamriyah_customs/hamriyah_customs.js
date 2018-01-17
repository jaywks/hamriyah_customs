// Copyright (c) 2016, Climbforce FZC and contributors
// For license information, please see license.txt

frappe.ui.form.on('Hamriyah Customs', {
  refresh: function(frm) {

  }
});

//fetch arabic name from arabic_name to customer_ar
frappe.ui.form.on("Hamriyah Customs", "customer", function(frm, cdt, cdn) {
  frappe.call({
    "method": "frappe.client.get_value",
    args: {
      doctype: "Customer",
      fieldname: "arabic_name",
      filters: {
        name: ["=", frm.doc.customer]
      }
    },
    callback: function(data) {
      console.log(data);
      cur_frm.set_value("customer_ar", data.message.arabic_name);
    }
  })

});

//fetch arabic address from arabic_address to address_ar
frappe.ui.form.on("Hamriyah Customs", "customer", function(frm, cdt, cdn) {
  frappe.call({
    "method": "frappe.client.get_value",
    args: {
      doctype: "Customer",
      fieldname: "arabic_address",
      filters: {
        name: ["=", frm.doc.customer]
      }
    },
    callback: function(data) {
      console.log(data);
      cur_frm.set_value("address_ar", data.message.arabic_address);
    }
  })

});

//fetch customer TRN  from tax_id to tax_id
frappe.ui.form.on("Hamriyah Customs", "customer", function(frm, cdt, cdn) {
  frappe.call({
    "method": "frappe.client.get_value",
    args: {
      doctype: "Customer",
      fieldname: "tax_id",
      filters: {
        name: ["=", frm.doc.customer]
      }
    },
    callback: function(data) {
      console.log(data);
      cur_frm.set_value("tax_id", data.message.tax_id);
    }
  })

});
//fetch  consignee address details
frappe.ui.form.on("Hamriyah Customs", "consignee_address", function(frm) {
  frappe.call({
    "method": "frappe.client.get",
    args: {
      doctype: "Address",
      name: frm.doc.consignee_address
    },
    callback: function(data) {
      frappe.model.set_value(frm.doctype, frm.docname, "consignee_address_display",
        data.message.address_line1 +
        (data.message.address_line2 ? ("\n" + data.message.address_line2) : "") +
        (data.message.city ? ("\n" + data.message.city) : "") +
        (data.message.state ? (", " + data.message.state) : "") +
        (data.message.pincode ? (" " + data.message.pincode) : "") +
        (data.message.country ? ("\n" + data.message.country) : "") +
        (data.message.phone ? ("\n" + data.message.phone) : "") +
        (data.message.fax ? ("\n" + data.message.fax) : "")
      )
    }
  })
});
/*frappe.ui.form.on("Hamriyah Customs", {
	consignee_address: function(frm) {
		erpnext.utils.get_address_display(this.frm, "consignee_address", "consignee_address_display");
	}
});*/

//fetch alternate consignee (Customer) address
/*frappe.ui.form.on("Hamriyah Customs", "consignee_address", function(frm, cdt, cdn) {
	return frappe.call({
		method: "erpnext.utilities.doctype.address.address.get_address_display",
		args: {
			"address_dict": frm.doc.consignee_address
		},
		callback: function(r) {
			if(r.message)
				frm.set_value("consignee_address_display", r.message);
		}
	});
});*/

//set address_title
/*frappe.ui.form.on("Hamriyah Customs", "alternate_consignee", function(frm, cdt, cdn) {
  frappe.call({
    "method": "frappe.client.get_value",
    args: {
      doctype: "Address",
      fieldname: "address_title",
      filters: {
        name: ["=", frm.doc.alternate_consignee]
      }
    },
    callback: function(data) {
      console.log(data);
      cur_frm.set_value("consignee_address", data.message.address_title);
    }
  })

});

/*frappe.ui.form.on("Hamriyah Customs", "consignee_address", function(frm, cdt, cdn) {
  return frm.call({
    method: "erpnext.utilities.doctype.address.address.get_address_display",
    child: d,
    args: {
      "address_dict": frm.doc.consignee_address,
      doctype: 'Address',
      filters: [
        ["Dynamic Link", "link_doctype", "=", "Customer"],
        ["Dynamic Link", "link_name", "=", doc.customer],
        ["address_type", "=", "Billing"]
      ]
    },
    callback: function(r) {
      if (r.message)
        frappe.model.set_value("consignee_address_display", r.message);
    }
  });
});
*/

//fetch child table from Delivery Note Item to Hamriyah Customs Item (item_code & qty)
frappe.ui.form.on("Hamriyah Customs", "delivery_note", function(frm) {
  frappe.model.with_doc("Delivery Note", frm.doc.delivery_note, function() {
    var tabletransfer = frappe.model.get_doc("Delivery Note", frm.doc.delivery_note)
    frappe.model.clear_table(frm.doc, "items"); //remove extra blank row
    $.each(tabletransfer.items, function(index, row) {
      d = frm.add_child("items");
      d.item_code = row.item_code;
      d.qty = row.qty;
      cur_frm.refresh_field("items");
    })
  });
});


//fetch Item Details -manual re-select item_code by mouse
cur_frm.add_fetch("item_code", "ham_weight", "unit_weight");
cur_frm.add_fetch("item_code", "description_ar", "description");
cur_frm.add_fetch("item_code", "description_custom_en", "description_custom_en");


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
//Calculate amount per line (weight_kg*price_per_kg) recalculate when qty changes
frappe.ui.form.on("Hamriyah Customs Item", "qty", function(frm, doctype, name) {
  var row = locals[doctype][name];
  row.amount = row.price_per_kg * row.weight_kg;
  refresh_field("items");
});
//Calculate amount per line (weight_kg*price_per_kg) recalculate when unit_weight changes
frappe.ui.form.on("Hamriyah Customs Item", "unit_weight", function(frm, doctype, name) {
  var row = locals[doctype][name];
  row.amount = row.price_per_kg * row.weight_kg;
  refresh_field("items");
});


//calculate total qty
frappe.ui.form.on("Hamriyah Customs", "validate", function(frm, doc) {
  var total = 0
  $.each(frm.doc["items"] || [], function(i, d) {
    total += d.qty
  });
  frm.set_value('sum_qty', total);
});
//calculate total weight_kg
frappe.ui.form.on("Hamriyah Customs", "validate", function(frm, doc) {
  var total = 0
  $.each(frm.doc["items"] || [], function(i, d) {
    total += d.weight_kg
  });
  frm.set_value('sum_weight_kg', total);
});
//calculate total amount
frappe.ui.form.on("Hamriyah Customs", "validate", function(frm, doc) {
  var total = 0
  $.each(frm.doc["items"] || [], function(i, d) {
    total += d.amount
  });
  frm.set_value('sum_amount', total);
});

//calculate grand total
// add a trigger on field "sum_amount"
cur_frm.cscript.sum_amount = function(doc, cdt, cdn) {
  // update a new field "custom_field3"
  doc.grand_total = flt(doc.sum_amount) * (flt(doc.tax_rate) / 100 + 1);
  doc.total_taxes = flt(doc.sum_amount) * (flt(doc.tax_rate) / 100);
  refresh_field('grand_total');
  refresh_field('total_taxes');
  refresh_field('sum_amount');
  cur_frm.refresh();
}
// add the same trigger on "tax_rate"
cur_frm.cscript.tax_rate = cur_frm.cscript.sum_amount;