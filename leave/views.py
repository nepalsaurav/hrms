import json
from django.db.models import Q, query
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.pagination import PageNumberPagination
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
from rest_framework import generics
from django_filters import rest_framework as filters





class LeaveLists(generics.ListAPIView):
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = LeaveFilter
    
    def list(self, request, *args, **kwargs):
        form = LeaveFilter(request.GET)
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            search_form = render_to_string("leave/search_form.html", {"form": form.form})
            return self.get_paginated_response({"list": serializer.data, "searchForm": search_form})

        serializer = self.get_serializer(queryset, many=True)
        search_form = render_to_string("leave/search_form.html", {"form": form.form})
        return Response({"list": serializer.data, "searchForm": search_form})



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