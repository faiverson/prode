(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("common/directives/confirmation-popup/confirmation-popover.tpl.html",
    "<div class=\"text-center\">Are you sure?</div>\n" +
    "<div class=\"form-group text-center\" style=\"min-width: 125px;\">\n" +
    "    <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n" +
    "        <button type=\"button\"\n" +
    "                data-ng-click=\"confirm()\"\n" +
    "                class=\"btn btn-sm btn-success\">Confirm\n" +
    "        </button>\n" +
    "        <button type=\"button\"\n" +
    "                data-ng-click=\"cancel()\"\n" +
    "                class=\"btn btn-sm btn-warning\">Cancel\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("common/directives/confirmation-popup/confirmation-popup.tpl.html",
    "\n" +
    "<button type=\"button\"\n" +
    "		class=\"btn btn-danger\"\n" +
    "        popover-is-open=\"isOpen\"\n" +
    "        popover-trigger=\"outsideClick\"\n" +
    "        uib-popover-template=\"'common/directives/confirmation-popup/confirmation-popover.tpl.html'\"\n" +
    "        type=\"button\">{{ text }}\n" +
    "</button>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("common/directives/country-region/country.tpl.html",
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/auth/forgot-pass.tpl.html",
    "<div class=\"modal-header\" style=\"background:#e05543;\">\n" +
    "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n" +
    "            aria-hidden=\"true\">&times;</span></button>\n" +
    "    <h4 style=\"font-size: 18px; color: #fff;\" class=\"modal-title\" id=\"LoginModalTitle\">Forgot Password?</h4>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form name=\"forgotPassword\" novalidate=\"novalidate\">\n" +
    "        <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "            <input type=\"text\"\n" +
    "                   name=\"email\"\n" +
    "                   class=\"form-control\"\n" +
    "                   id=\"email\"\n" +
    "                   required\n" +
    "                   data-ng-minlength=\"4\"\n" +
    "                   data-ng-model=\"email\"\n" +
    "                   placeholder=\"E-Mail\">\n" +
    "            <span class=\"glyphicon glyphicon-envelope form-control-feedback\" aria-hidden=\"true\"></span>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button type=\"button\" data-ng-disabled=\"forgotPassword.$invalid\" class=\"greeny full-w\" data-ng-click=\"send()\">\n" +
    "        Send\n" +
    "    </button>\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/auth/login.tpl.html",
    "<div class=\"centering\">\n" +
    "    <div id=\"login-wrap\" class=\"container vertical-center\">\n" +
    "        <div class=\"row\">\n" +
    "            <div id=\"form-wrap\" class=\"col-md-12 center-block\">\n" +
    "            <div class=\"show\"><!-- Login Step 1 -->\n" +
    "                <br>\n" +
    "                <form autocomplete=\"off\" name=\"loginForm\" novalidate=\"novalidate\" data-ng-submit=\"login()\" class=\"form-signin\">\n" +
    "                    <div class=\"control-group\">\n" +
    "                        <input data-ng-minlength=\"4\" data-ng-model=\"user.username\" class=\"form-control\"\n" +
    "                               placeholder=\"Enter Username\" required type=\"text\" name=\"username\">\n" +
    "                    </div>\n" +
    "                    <div class=\"control-group\">\n" +
    "                        <input data-ng-minlength=\"4\" data-ng-model=\"user.password\" class=\"form-control\" autofocus\n" +
    "                               placeholder=\"Enter Your Password\" required type=\"password\" name=\"password\">\n" +
    "                    </div>\n" +
    "                    <hr>\n" +
    "                    <div class=\"col-md-12 text-right\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary\">Send</button>\n" +
    "                    </div>\n" +
    "                    <div class=\"clearfix\"></div>\n" +
    "                </form><!-- /form -->\n" +
    "            </div>\n" +
    "            <div class=\"hide\"><!-- Login Case No Account Registered -->\n" +
    "                <p style=\"font-size: 18px;\" class=\"text-center\">Opps! Looks like you dont have an account</p>\n" +
    "                <hr>\n" +
    "                <a class=\"btn-blue text-center\" href=\"#\">Click Here To Create Account</a>\n" +
    "                <a href=\"#\" class=\"mt20 full-w text-center\">go back to login and try again</a>\n" +
    "            </div>\n" +
    "            <div class=\"text-center mt20\">\n" +
    "                <a id=\"form-login-forgotten\" href=\"#\" class=\"text-center\" data-ng-click=\"openForgotPassword()\">Forgot Password?</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/auth/reset-pass.tpl.html",
    "<div id=\"login-wrap\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <div id=\"form-wrap\" class=\"col-md-12 center-block\">\n" +
    "                <p class=\"text-center\">Reset password</p>\n" +
    "                <hr>\n" +
    "                <form name=\"resetPasswordForm\" novalidate=\"novalidate\" data-ng-init=\"setFromScope(this)\">\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <!--<label for=\"username\">Username</label>-->\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"username\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"username\"\n" +
    "                               required\n" +
    "                               data-ng-minlength=\"4\"\n" +
    "                               data-ng-model=\"auth.email\"\n" +
    "                               placeholder=\"E-Mail\">\n" +
    "                        <span class=\"glyphicon glyphicon-envelope form-control-feedback\" aria-hidden=\"true\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <!--<label for=\"password\">Password</label>-->\n" +
    "                        <input type=\"password\"\n" +
    "                               name=\"password\"\n" +
    "                               id=\"password\"\n" +
    "                               class=\"form-control\"\n" +
    "                               required\n" +
    "                               data-ng-minlength=\"4\"\n" +
    "                               data-ng-model=\"auth.password\"\n" +
    "                               placeholder=\"Password\">\n" +
    "                        <span class=\"glyphicon glyphicon-lock form-control-feedback\" aria-hidden=\"true\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <!--<label for=\"password\">Password</label>-->\n" +
    "                        <input type=\"password\"\n" +
    "                               name=\"password_confirmation\"\n" +
    "                               id=\"password_confirmation\"\n" +
    "                               class=\"form-control\"\n" +
    "                               required\n" +
    "                               data-compare-to=\"auth.password\"\n" +
    "                               data-ng-minlength=\"4\"\n" +
    "                               data-ng-model=\"auth.password_confirmation\"\n" +
    "                               placeholder=\"Password Confirmation\">\n" +
    "                        <span class=\"glyphicon glyphicon-lock form-control-feedback\" aria-hidden=\"true\"></span>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "                <div id=\"form-login-links\">\n" +
    "                    <button class=\"btn btn-warning btn-block\"\n" +
    "                            data-ng-click=\"send()\"\n" +
    "                            data-ng-disabled=\"resetPasswordForm.$invalid\">Reset!\n" +
    "                    </button>\n" +
    "                    <!--<a id=\"form-login-submit\" class=\"button bg-orange\" href=\"#\">Reset!</a>-->\n" +
    "\n" +
    "                    <div class=\"clear\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/auth/signup.tpl.html",
    "<div id=\"login-wrap\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "\n" +
    "            <div id=\"form-wrap\" class=\"col-md-12 center-block\">\n" +
    "                <form name=\"form\" novalidate=\"novalidate\">\n" +
    "                    <h4 class=\"text-center\">Contact Information</h4>\n" +
    "                    <hr>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"first_name\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"first_name\"\n" +
    "                               required minlength=\"4\" maxlength=\"50\"\n" +
    "                               data-ng-model=\"auth.first_name\"\n" +
    "                               placeholder=\"First Name\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"last_name\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"last_name\"\n" +
    "                               required minlength=\"4\" maxlength=\"50\"\n" +
    "                               data-ng-model=\"auth.last_name\"\n" +
    "                               placeholder=\"Last Name\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"email\"\n" +
    "                               name=\"email\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"email\"\n" +
    "                               required\n" +
    "                               data-ng-model=\"auth.email\"\n" +
    "                               placeholder=\"Email Address\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"username\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"username\"\n" +
    "                               required data-ng-minlength=\"4\"\n" +
    "                               data-ng-model=\"auth.username\"\n" +
    "                               placeholder=\"Username\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"phone\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"phone\"\n" +
    "                               required\n" +
    "                               ng-pattern=\"/^([\\s\\+\\-\\(\\)0-9]){6,18}$/\"\n" +
    "                               msg-pattern=\"Invalid phone\"\n" +
    "                               data-ng-model=\"auth.phone\"\n" +
    "                               placeholder=\"Phone\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" data-show-errors=\"\">\n" +
    "                        <select class=\"form-control\"\n" +
    "                                ng-country\n" +
    "                                required\n" +
    "                                data-show-default-option=\"false\"\n" +
    "                                data-default-value=\"United States\"\n" +
    "                                ng-model=\"auth.country\"\n" +
    "                                name=\"country\"\n" +
    "                                data-region-id=\"userRegion\">\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" data-show-errors=\"\">\n" +
    "                        <select class=\"form-control\"\n" +
    "                                ng-region\n" +
    "                                required\n" +
    "                                data-show-default-option=\"true\"\n" +
    "                                data-default-option=\"What State Do You Live In?\"\n" +
    "                                id=\"userRegion\"\n" +
    "                                name=\"state\"\n" +
    "                                ng-model=\"auth.state\">\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <h4 class=\"mt20 text-center\">Enagic&reg; Information</h4>\n" +
    "                    <hr>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"enagic_name\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"enagic_name\"\n" +
    "                               required minlength=\"4\" maxlength=\"100\"\n" +
    "                               data-ng-model=\"auth.enagic_name\"\n" +
    "                               placeholder=\"Enagic Name\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"enagic_phone\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"enagic_phone\"\n" +
    "                               ng-pattern=\"/^([\\s\\+\\-\\(\\)0-9]){6,18}$/\"\n" +
    "                               msg-pattern=\"Invalid phone\"\n" +
    "                               data-ng-model=\"auth.enagic_phone\"\n" +
    "                               placeholder=\"Enagic Phone\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"email\"\n" +
    "                               name=\"enagic_email\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"enagic_email\"\n" +
    "                               required\n" +
    "                               data-ng-model=\"auth.enagic_email\"\n" +
    "                               placeholder=\"Enagic Email\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <select data-ng-change=\"updatePlaceholder()\" required ng-init=\"auth.enagic_id_type=''\"\n" +
    "                                name=\"enagic_id_type\"\n" +
    "                                placeholder=\"please select an option\" data-ng-model=\"auth.enagic_id_type\"\n" +
    "                                class=\"form-control mb10\">\n" +
    "                            <option value=\"\">Please select an option</option>\n" +
    "                            <option value=\"id\">Enagic Distributor ID</option>\n" +
    "                            <option value=\"onlineorder\">Enagic Online Order Number</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "                        <input type=\"text\"\n" +
    "                               name=\"enagic_id\"\n" +
    "                               class=\"form-control\"\n" +
    "                               id=\"enagic_id\"\n" +
    "                               required minlength=\"4\" maxlength=\"10\"\n" +
    "                               data-ng-model=\"auth.enagic_id\"\n" +
    "                               placeholder=\"{{enagic_id_placeholder}}\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "\n" +
    "                        <input type=\"password\"\n" +
    "                               name=\"password\"\n" +
    "                               id=\"password\"\n" +
    "                               class=\"form-control\"\n" +
    "                               minlength=\"8\"\n" +
    "                               maxlength=\"20\"\n" +
    "                               data-ng-model=\"auth.password\"\n" +
    "                               placeholder=\"Password\">\n" +
    "                        <span class=\"glyphicon glyphicon-lock form-control-feedback\" aria-hidden=\"true\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group has-feedback\" data-show-errors>\n" +
    "\n" +
    "                        <input name=\"password_confirmation\"\n" +
    "                               id=\"password_confirmation\"\n" +
    "                               class=\"form-control\"\n" +
    "                               required\n" +
    "                               data-compare-to=\"auth.password\"\n" +
    "                               type=\"password\" minlength=\"8\"\n" +
    "                               maxlength=\"20\"\n" +
    "                               data-ng-model=\"auth.password_confirmation\"\n" +
    "                               placeholder=\"Password Confirmation\">\n" +
    "                        <span class=\"glyphicon glyphicon-lock form-control-feedback\" aria-hidden=\"true\"></span>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "                <div id=\"form-login-links\">\n" +
    "                    <button class=\"btn btn-warning btn-block\"\n" +
    "                            data-ng-click=\"send()\"\n" +
    "                            data-ng-disabled=\"resetPasswordForm.$invalid\">Create Account!\n" +
    "                    </button>\n" +
    "                    <!--<a id=\"form-login-submit\" class=\"button bg-orange\" href=\"#\">Reset!</a>-->\n" +
    "\n" +
    "                    <div class=\"clear\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/dashboard/dashboard.tpl.html",
    "<div data-ng-include=\"'modules/shared/header-general/header-general.tpl.html'\"></div>\n" +
    "<div class=\"container\">\n" +
    "    <div id=\"login-wrap\" class=\"container vertical-center\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"fu apt\">\n" +
    "                <div class=\"gq gg ala\">\n" +
    "                    <div class=\"apu ano\">\n" +
    "                        <div class=\"alz\">\n" +
    "                            <span class=\"anj\">Page views</span>\n" +
    "                            <h2 class=\"ani\">\n" +
    "                                12,938\n" +
    "                                <small class=\"ank anl\">5%</small>\n" +
    "                            </h2>\n" +
    "                            <hr class=\"ans akt\">\n" +
    "                        </div>\n" +
    "                        <canvas id=\"sparkline1\" width=\"378\" height=\"94\" class=\"apv\" data-chart=\"spark-line\" data-value=\"[{data:[28,68,41,43,96,45,100]}]\" data-labels=\"['a','b','c','d','e','f','g']\" style=\"width: 189px; height: 47px;\"></canvas>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"gq gg ala\">\n" +
    "                    <div class=\"apu anr\">\n" +
    "                        <div class=\"alz\">\n" +
    "                            <span class=\"anj\">Downloads</span>\n" +
    "                            <h2 class=\"ani\">\n" +
    "                                758\n" +
    "                                <small class=\"ank anm\">1.3%</small>\n" +
    "                            </h2>\n" +
    "                            <hr class=\"ans akt\">\n" +
    "                        </div>\n" +
    "                        <canvas id=\"sparkline1\" width=\"378\" height=\"94\" class=\"apv\" data-chart=\"spark-line\" data-value=\"[{data:[4,34,64,27,96,50,80]}]\" data-labels=\"['a', 'b','c','d','e','f','g']\" style=\"width: 189px; height: 47px;\"></canvas>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"gq gg ala\">\n" +
    "                    <div class=\"apu anp\">\n" +
    "                        <div class=\"alz\">\n" +
    "                            <span class=\"anj\">Sign-ups</span>\n" +
    "                            <h2 class=\"ani\">\n" +
    "                                1,293\n" +
    "                                <small class=\"ank anl\">6.75%</small>\n" +
    "                            </h2>\n" +
    "                            <hr class=\"ans akt\">\n" +
    "                        </div>\n" +
    "                        <canvas id=\"sparkline1\" width=\"378\" height=\"94\" class=\"apv\" data-chart=\"spark-line\" data-value=\"[{data:[12,38,32,60,36,54,68]}]\" data-labels=\"['a', 'b','c','d','e','f','g']\" style=\"width: 189px; height: 47px;\"></canvas>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"gq gg ala\">\n" +
    "                    <div class=\"apu anq\">\n" +
    "                        <div class=\"alz\">\n" +
    "                            <span class=\"anj\">Downloads</span>\n" +
    "                            <h2 class=\"ani\">\n" +
    "                                758\n" +
    "                                <small class=\"ank anm\">1.3%</small>\n" +
    "                            </h2>\n" +
    "                            <hr class=\"ans akt\">\n" +
    "                        </div>\n" +
    "                        <canvas id=\"sparkline1\" width=\"378\" height=\"94\" class=\"apv\" data-chart=\"spark-line\" data-value=\"[{data:[43,48,52,58,50,95,100]}]\" data-labels=\"['a', 'b','c','d','e','f','g']\" style=\"width: 189px; height: 47px;\"></canvas>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div data-ng-include=\"'modules/shared/footer/footer.tpl.html'\"></div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/fixture/fixture.tpl.html",
    "<div data-ng-include=\"'modules/shared/header-general/header-general.tpl.html'\"></div>\n" +
    "<div class=\"container\">\n" +
    "    <h1>Fixture</h1>\n" +
    "    <table class=\"table\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>#</th>\n" +
    "            <th sort-column=\"author\" on-sort=\"getSeason()\" sort-data=\"sortBy\">Fixture</th>\n" +
    "            <th>Start</th>\n" +
    "            <th>End</th>\n" +
    "            <th>Actions</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr data-ng-repeat=\"fixture in fixtures\">\n" +
    "            <td data-ng-bind=\"fixture.number\"></td>\n" +
    "            <td data-ng-bind=\"fixture.start_at\"></td>\n" +
    "            <td data-ng-bind=\"fixture.end_at\"></td>\n" +
    "            <td data-ng-bind=\"fixture.end_at\"></td>\n" +
    "            <!--<td>-->\n" +
    "                <!--<a ui-sref=\"{{fixture.id}}\" class=\"btn btn-warning\">Fixture</a>-->\n" +
    "            <!--</td>-->\n" +
    "        </tr>\n" +
    "\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <div class=\"table-nav row\" ng-if=\"table.pagination.total >= table.pagination.items\">\n" +
    "        <div class=\"col-md-8\">\n" +
    "            <uib-pagination direction-links=\"false\"\n" +
    "                            total-items=\"table.pagination.total\"\n" +
    "                            items-per-page=\"table.pagination.items\"\n" +
    "                            ng-model=\"table.pagination.current\"\n" +
    "                            ng-change=\"update()\"\n" +
    "                            num-pages=\"smallnumPages\"></uib-pagination>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <uib-pager total-items=\"table.pagination.total\"\n" +
    "                       items-per-page=\"table.pagination.items\"\n" +
    "                       ng-model=\"table.pagination.current\"\n" +
    "                       ng-change=\"update()\">\n" +
    "            </uib-pager>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div data-ng-include=\"'modules/shared/footer/footer.tpl.html'\"></div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/modal/prospect.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" data-ng-click=\"close()\" aria-label=\"Close\">\n" +
    "        <span aria-hidden=\"true\">×</span>\n" +
    "    </button>\n" +
    "    <h3 class=\"modal-title\">Prospect</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <form id=\"prospectForm\" name=\"prospectForm\" novalidate=\"novalidate\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <div class=\"form-group has-feedback\">\n" +
    "                    <input type=\"text\"\n" +
    "                           name=\"first_name\"\n" +
    "                           class=\"form-control\"\n" +
    "                           id=\"first_name\"\n" +
    "                           required\n" +
    "                           data-ng-model=\"prospect.first_name\"\n" +
    "                           placeholder=\"First Name\" />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <div class=\"form-group has-feedback\">\n" +
    "                    <input type=\"text\"\n" +
    "                           name=\"last_name\"\n" +
    "                           class=\"form-control\"\n" +
    "                           id=\"last_name\"\n" +
    "                           required\n" +
    "                           data-ng-model=\"prospect.last_name\"\n" +
    "                           placeholder=\"Last Name\" />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "			<div class=\"col-md-6\">\n" +
    "				<div class=\"form-group has-feedback\">\n" +
    "					<input type=\"text\"\n" +
    "						   name=\"email\"\n" +
    "						   class=\"form-control\"\n" +
    "						   id=\"email\"\n" +
    "						   required\n" +
    "						   data-ng-model=\"prospect.email\"\n" +
    "						   placeholder=\"Email\" />\n" +
    "				</div>\n" +
    "			</div>\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <div class=\"form-group has-feedback\">\n" +
    "                    <input type=\"text\"\n" +
    "                           name=\"phone\"\n" +
    "                           class=\"form-control\"\n" +
    "                           id=\"phone\"\n" +
    "                           required\n" +
    "                           data-ng-model=\"prospect.phone\"\n" +
    "                           placeholder=\"phone number\" />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "		<div class=\"row\">\n" +
    "			<div class=\"col-md-6\">\n" +
    "				<div class=\"form-group has-feedback\">\n" +
    "					<input type=\"text\"\n" +
    "						   name=\"username\"\n" +
    "						   class=\"form-control\"\n" +
    "						   id=\"username\"\n" +
    "						   required\n" +
    "						   data-ng-model=\"prospect.username\"\n" +
    "						   placeholder=\"Username\" />\n" +
    "				</div>\n" +
    "			</div>\n" +
    "			<div class=\"col-md-6\"></div>\n" +
    "		</div>\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <div class=\"form-group has-feedback\">\n" +
    "                    <input type=\"text\"\n" +
    "                           name=\"password\"\n" +
    "                           class=\"form-control\"\n" +
    "                           id=\"password\"\n" +
    "                           required\n" +
    "                           data-ng-model=\"prospect.password\"\n" +
    "                           placeholder=\"Password\" />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <div class=\"form-group has-feedback\">\n" +
    "                    <input type=\"text\"\n" +
    "                           name=\"confirm_password\"\n" +
    "                           class=\"form-control\"\n" +
    "                           id=\"confirm_password\"\n" +
    "                           required\n" +
    "                           data-ng-model=\"prospect.confirm_password\"\n" +
    "                           placeholder=\"Confirm Password\" />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <!--<button class=\"btn btn-primary\" type=\"button\" ng-click=\"close()\">Close</button>-->\n" +
    "    <button type=\"submit\"\n" +
    "            data-ng-disabled=\"prospectForm.$invalid\"\n" +
    "            class=\"btn btn-warning\"\n" +
    "            ng-autodisable\n" +
    "            data-ng-click=\"save()\">Submit\n" +
    "    </button>\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/season/season.tpl.html",
    "<div data-ng-include=\"'modules/shared/header-general/header-general.tpl.html'\"></div>\n" +
    "<div class=\"container\">\n" +
    "    <h1>Season\n" +
    "        <!--<button class=\"btn btn-sm btn-primary pull-right\" ui-sref=\"testimonials.new\">NEW TESTIMONIAL</button>-->\n" +
    "    </h1>\n" +
    "    <table class=\"table\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>#</th>\n" +
    "            <th sort-column=\"author\" on-sort=\"getSeason()\" sort-data=\"sortBy\">Season</th>\n" +
    "            <th>Actions</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr data-ng-repeat=\"season in seasons\">\n" +
    "            <td>{{ season.id}}</td>\n" +
    "            <td data-ng-bind=\"season.name\"></td>\n" +
    "            <td>\n" +
    "                <a href=\"/fixture/{{season.id}}\" class=\"btn btn-warning\">Fixture</a>\n" +
    "                        <!--<li><a ui-sref=\"testimonials.edit({id:testimonial.id})\">Edit</a></li>-->\n" +
    "                        <!--<li><a href=\"#\" data-ng-click=\"openDeleteConfirm(testimonial.id)\">Remove</a></li>-->\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "    <div class=\"table-nav row\">\n" +
    "        <div class=\"col-md-8\">\n" +
    "            <uib-pagination direction-links=\"false\"\n" +
    "                            total-items=\"pagination.totalItems\"\n" +
    "                            ng-model=\"pagination.currentPage\"\n" +
    "                            items-per-page=\"pagination.itemsPerPage\"\n" +
    "                            ng-change=\"pagination.pageChange()\"\n" +
    "                            num-pages=\"smallnumPages\"></uib-pagination>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <uib-pager total-items=\"pagination.totalItems\"\n" +
    "                       items-per-page=\"pagination.itemsPerPage\"\n" +
    "                       ng-model=\"pagination.currentPage\"\n" +
    "                       ng-change=\"pagination.pageChange()\">\n" +
    "            </uib-pager>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div data-ng-include=\"'modules/shared/footer/footer.tpl.html'\"></div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/users/users.tpl.html",
    "<div class=\"container\">\n" +
    "	<header class=\"header clearfix\">\n" +
    "		<div id=\"logo\" class=\"col-md-12\">\n" +
    "			<a href=\"javascript:void(0)\" id=\"logow\"><img src=\"/assets/images/logo.png\"></a>\n" +
    "		</div>\n" +
    "		<div class=\"header clearfix\">\n" +
    "			<nav>\n" +
    "				<ul class=\"nav nav-pills pull-right\">\n" +
    "					<li role=\"presentation\" class=\"active\"><a href=\"#\">Users</a></li>\n" +
    "				</ul>\n" +
    "			</nav>\n" +
    "			<h3 class=\"text-muted\">Project name</h3>\n" +
    "		</div>\n" +
    "	</header>\n" +
    "	<section class=\"row clearfix\">\n" +
    "		<form method=\"post\">\n" +
    "			<div class=\"col-md-12\">\n" +
    "				<section class=\"users\">\n" +
    "					<table class=\"table table-striped\">\n" +
    "						<thead>\n" +
    "							<tr>\n" +
    "								<th sort-column=\"\" on-sort=\"\" sort-data=\"\">#</th>\n" +
    "								<th sort-column=\"\" on-sort=\"\" sort-data=\"\"> Name</th>\n" +
    "								<th sort-column=\"\" on-sort=\"\" sort-data=\"\"> Email</th>\n" +
    "								<th sort-column=\"status\" on-sort=\"\" sort-data=\"\"></th>\n" +
    "							</tr>\n" +
    "						</thead>\n" +
    "						<tbody>\n" +
    "							<tr data-ng-repeat=\"user in users\">\n" +
    "								<td>{{ user.id}}</td>\n" +
    "								<td>{{ user.first_name}} {{ user.last_name}}</td>\n" +
    "								<td>{{ user.email }}</td>\n" +
    "								<td class=\"\">\n" +
    "									<div class=\"pull-right\">\n" +
    "										<a href=\"#\" data-ng-click=\"getProspectInfo(user.prospect_id)\" class=\"btn btn-sm btn-info\">Prospect Info</a>\n" +
    "										<a href=\"#\" data-ng-click=\"getUserInfo(user)\" class=\"btn btn-sm btn-success\">User Info</a>\n" +
    "									</div>\n" +
    "								</td>\n" +
    "							</tr>\n" +
    "						</tbody>\n" +
    "					</table>\n" +
    "				</section>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "	</section>\n" +
    "	<script type=\"text/ng-template\" id=\"prospect-info.tpl.html\">\n" +
    "		<div class=\"modal-header\">\n" +
    "			<button type=\"button\" class=\"close\" data-ng-click=\"close()\" aria-label=\"Close\">\n" +
    "				<span aria-hidden=\"true\">×</span>\n" +
    "			</button>\n" +
    "			<h3 class=\"modal-title\">Prospect Info</h3>\n" +
    "		</div>\n" +
    "		<div class=\"modal-body\">\n" +
    "			<table class=\"table table-responsive table-striped\" >\n" +
    "				<tr>\n" +
    "					<td>ID</td>\n" +
    "					<td>{{prospect.id}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Name</td>\n" +
    "					<td>{{prospect.first_name}} {{prospect.last_name}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Username</td>\n" +
    "					<td>{{prospect.username}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Email</td>\n" +
    "					<td>{{prospect.email}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Phone</td>\n" +
    "					<td>{{prospect.phone}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Sponsor ID</td>\n" +
    "					<td>{{prospect.sponsor_id}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Last Login</td>\n" +
    "					<td>{{prospect.last_login_at}}</td>\n" +
    "				</tr>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "	</script>\n" +
    "	<script type=\"text/ng-template\" id=\"user-info.tpl.html\">\n" +
    "		<div class=\"modal-header\">\n" +
    "			<button type=\"button\" class=\"close\" data-ng-click=\"close()\" aria-label=\"Close\">\n" +
    "				<span aria-hidden=\"true\">×</span>\n" +
    "			</button>\n" +
    "			<h3 class=\"modal-title\">User Info</h3>\n" +
    "		</div>\n" +
    "		<div class=\"modal-body\">\n" +
    "			<table class=\"table table-responsive table-striped\" >\n" +
    "				<tr>\n" +
    "					<td>ID</td>\n" +
    "					<td>{{user.id}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Name</td>\n" +
    "					<td>{{user.first_name}} {{user.last_name}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Username</td>\n" +
    "					<td>{{user.username}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Email</td>\n" +
    "					<td>{{user.email}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>IP addresss</td>\n" +
    "					<td>{{user.ip_address}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Phone</td>\n" +
    "					<td>{{user.phone}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Social Security Number</td>\n" +
    "					<td>{{user.social_security_number}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td>Sponsor ID</td>\n" +
    "					<td>{{user.sponsor_id}}</td>\n" +
    "				</tr>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "	</script>\n" +
    "</div>");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/shared/footer/footer.tpl.html",
    "<div class=\"container-fluid footer-wrap\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"col-md-12 text-center\">\n" +
    "            <footer>\n" +
    "                <div class=\"col-md-12 col-xs-12\"><span>COPYRIGHT &copy; Prode - ALL RIGHTS RESERVED.</span></div>\n" +
    "            </footer>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("templates-app"); }
catch(err) { app = angular.module("templates-app", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("modules/shared/header-general/header-general.tpl.html",
    "<div data-ng-controller=\"HeaderCtrl\">\n" +
    "    <header>\n" +
    "        <div class=\"navbar navbar-default navbar-fixed-top\">\n" +
    "            <nav class=\"navbar-collapse collapse\">\n" +
    "                <div class=\"container-fluid\">\n" +
    "                    <div class=\"navbar-header\">\n" +
    "                        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "                            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                            <span class=\"icon-bar\"></span>\n" +
    "                            <span class=\"icon-bar\"></span>\n" +
    "                            <span class=\"icon-bar\"></span>\n" +
    "                        </button>\n" +
    "                        <a class=\"navbar-brand\" href=\"#\">PRODE</a>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "                        <ul class=\"nav navbar-nav\">\n" +
    "                            <li><a href=\"/season\">Seasons <span class=\"sr-only\">(current)</span></a></li>\n" +
    "                            <li><a href=\"#\">Link</a></li>\n" +
    "                            <li class=\"dropdown\">\n" +
    "                                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n" +
    "                                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                                    <li><a href=\"#\">Action</a></li>\n" +
    "                                    <li><a href=\"#\">Another action</a></li>\n" +
    "                                    <li><a href=\"#\">Something else here</a></li>\n" +
    "                                    <li class=\"divider\"></li>\n" +
    "                                    <li><a href=\"#\">Separated link</a></li>\n" +
    "                                    <li class=\"divider\"></li>\n" +
    "                                    <li><a href=\"#\">One more separated link</a></li>\n" +
    "                                </ul>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </nav>\n" +
    "        </div>\n" +
    "    </header>\n" +
    "</div>");
}]);
})();
