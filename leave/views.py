import json
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from leave.serialize import LeaveSerializer
from .forms import LeaveForm
from .models import Leave
from .filters import LeaveFilter
from django.core.paginator import Paginator
from django.template.loader import render_to_string
from rest_framework.renderers import JSONRenderer # type: ignore
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response




@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def leave_home(request):
    data = table_data(
        request = request,
        Model = Leave,
        FilterForm = LeaveFilter,
        per_page=10,
        search_template = "leave/search_form.html",
        ModelSerializer = LeaveSerializer
    )
    return Response(data)







def table_data(request, Model, FilterForm, per_page, search_template, ModelSerializer):
    order_by = request.GET.get('order_by')
    object = Model.objects
    object.set_user(request.user)
    if order_by == None or order_by == "":
        queryset = object.order_by('-created').all()
    else:
        queryset = object.order_by(order_by).all()
    
    filter = FilterForm(request.GET, queryset=queryset)
    per_page = request.GET.get('per_page')
    page = request.GET.get('page')
    if per_page == None or per_page == "":
        per_page = 10
    else:
        per_page = int(per_page)
    if page == None or page == "":
        page = 1
    else:
        page = int(page)
    p = Paginator(filter.qs, per_page)
    search_form = render_to_string(search_template, {"form": filter.form})
    try:
        page_list = p.page(page)
        page_info = {
            "totalSize": p.count,
            "currentPage": page_list.number,
            "perPage": p.per_page,
            "hasNext": page_list.has_next(),
            "hasPrevious": page_list.has_previous(),
            "totalPages": p.num_pages,
            "startIndex": page_list.start_index(),
            "endIndex": page_list.end_index(),
            "orderBy": order_by

        }
        serializer = ModelSerializer(page_list.object_list, many=True)
        table_data = JSONRenderer().render(serializer.data)
        return {
            "msgType": "success",
            "searchForm": search_form,
            "tableData":  json.loads(table_data),
            "pageInfo": page_info
        }
    except Exception as e:
        if(str(e) == "That page contains no results"):
            return {
                "msgType": "success",
                "searchForm": search_form,
                "tableData":  json.loads("[]"),
                "pageInfo": None,
            }
        return {
                "msgType": "failed",
                "msg": "something error occured",
                "searchForm": search_form,
                "tableData":  json.loads("[]"),
                "pageInfo": None
        }
    


def leave_add(request):
    if request.method == "GET":
        form = LeaveForm(initial = {"user": request.user})
        return render(request=request, template_name="leave/add_leave.html", context={"form": form})
    if request.method == "POST":
        form = LeaveForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse("success")
    return render(request, 'leave/add_leave.html', {'form': form})


def leave_single_view(request, id):
    leave = Leave.objects.filter(pk=id).all()
    serializer = LeaveSerializer(leave, many=True)
    data = JSONRenderer().render(serializer.data)
    return JsonResponse({
        "msgType": "success",
        "data": json.loads(data)
    })

def api_edit_leave(request, id):
    leave = get_object_or_404(Leave, pk=id)
    if request.method == "POST":
         form = LeaveForm(request.POST, instance=leave)
         if form.is_valid():
            form.save()
            return HttpResponse("success")
    if request.method == "GET":
        form = LeaveForm(instance=leave)
        return render(request=request, template_name="leave/add_leave.html", context={"form": form})