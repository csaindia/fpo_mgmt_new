// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.pages['user-dashboard'].on_page_load = function(wrapper) {
	var page =frappe.ui.make_app_page({
		parent: wrapper,
		title: __('User Dashboard'),
		single_column: true
	});
 var data; 
	 data ='sippy';
	 $(frappe.render_template('user_dashboard',data)).appendTo(wrapper);
	 //layout-main-section
	 
	frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "FPO Member",
				filters: {"fpo_member_name":frappe.user_info().name}    
			},
			callback: function(r) {
				console.log(r);
				 $("#mname").html(r.message.fpo_member_name );
				  $("#msince").html(r.message.date_of_joining );
				  $("#status").html(r.message.membership_status );
				    $("#sharecap").html(r.message.share_amount );
					  $("#noshare").html(r.message.share_allocated );
				   				
			}
		})
		
		
		
		frappe.call({
			method: "frappe.client.get",
			args: {
				doctype: "FPO External Loan",
				filters: {"loanee_name":frappe.user_info().name}    
			},
			callback: function(d) {
				console.log(d);
				 $("#lid").html(d.message.name );
				  $("#lamount").html(d.message.total_loan );
				  $("#lstatus").html(d.message.loan_status );
				    $("#lbalance").html(flt(d.message.total_loan)- flt(d.message.total_principal_paid ));
					 
				   				
			}
		})
		
		
				frappe.call({
					method: "erpnext.accounts.party.get_dashboard_info",
					args: {
						party_type: 'Customer',
						party: frappe.user_info().name
					},
					callback: function(s) {
						if(!r.exc) {
							if(s.message) {
								console.log(s.message);
							}  
						}
					}
				});
		
	 $("#mid").html(frappe.session.uid );
	 
	 console.log(frappe.user_info().name);
};
