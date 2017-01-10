# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "hamriyah_customs"
app_title = "Hamriyah Customs"
app_publisher = "Climbforce FZC"
app_description = "Issue Hamriyah Customs Documents"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "admin@climbforce.com"
app_license = "MIT"
# fixtures Print Format,Custom Field will export all app unrelated, just delete them
fixtures = ["Custom Field",
            "Custom Script",
            "Print Format"
              ]


# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/hamriyah_customs/css/hamriyah_customs.css"
# app_include_js = "/assets/hamriyah_customs/js/hamriyah_customs.js"

# include js, css files in header of web template
# web_include_css = "/assets/hamriyah_customs/css/hamriyah_customs.css"
# web_include_js = "/assets/hamriyah_customs/js/hamriyah_customs.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "hamriyah_customs.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "hamriyah_customs.install.before_install"
# after_install = "hamriyah_customs.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "hamriyah_customs.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"hamriyah_customs.tasks.all"
# 	],
# 	"daily": [
# 		"hamriyah_customs.tasks.daily"
# 	],
# 	"hourly": [
# 		"hamriyah_customs.tasks.hourly"
# 	],
# 	"weekly": [
# 		"hamriyah_customs.tasks.weekly"
# 	]
# 	"monthly": [
# 		"hamriyah_customs.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "hamriyah_customs.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "hamriyah_customs.event.get_events"
# }
