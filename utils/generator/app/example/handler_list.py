from somewhere import IndexHandler

#from $modulename$ import $ModuleName$Handler
#from $modulename$ import $ModuleName$AdminHandler

handler_list = [

    (r'/', IndexHandler),
    #The following lines are generated by mat_admin
    #---------------------------------------------
    #(r'/api/$modulename$', $ModuleName$Handler),
    #(r'/api/admin/$modulename$', $ModuleName$AdminHandler),
]