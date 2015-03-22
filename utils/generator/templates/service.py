__author__ = 'davidl'

template = \
"""
(function () {

    /**
     * This Controllers ........
     *
     * using the following services
     *
     */
    function $ClassName$Controller($ClassName$Service) {
        var self = this;
        self.list = [];
        self.load = function () {
            var req = $ClassName$Service.load(self.serial);
            req.success(function (data) {
                if (data.status == 0) {
                    self.list = data.data;
                } else {
                    self.error = data.error;
                }
            }).error(function (data) {
                 self.error = data;
            });
        };
        self.load();

    }
    angular.module('ate.common')
        .controller('$ClassName$Controller', ['$ClassName$Service', $ClassName$Controller]);
}());
"""

def create_service(class_name, module_name):
    #ret = handler_template.format(class_name, module_name)

    ret = template.replace('$ClassName$',class_name)
    ret = ret.replace('$module_name$',module_name)
    return ret
