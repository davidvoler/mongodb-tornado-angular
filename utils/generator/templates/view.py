__author__ = 'davidl'

template = \
"""
<h1 class="page-header" translate>$ClassName$</h1>
<div ng-if="$module_name$.error"
     class="alert alert-danger alert-dismissible"
     role="alert"
     style="margin-top: 50px">{{$module_name$.error}}
    <button type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<table>
    <tr>
        <td translate>Item</td>
    </tr>
    <tr ng-repeat="e in $module_name$.list track by $index">
        <td>{{ e }}</td>
    </tr>
</table>
"""

def create_view(class_name, module_name):
    #ret = handler_template.format(class_name, module_name)

    ret = template.replace('$ClassName$',class_name)
    ret = ret.replace('$module_name$',module_name)
    return ret
