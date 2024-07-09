from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .forms import LeaveForm
from .models import Leave
from .filters import LeaveFilter
from django.core.paginator import Paginator
from django.template.loader import render_to_string

# Create your views here.


# def leave_home(request):
    
#     order_by = request.GET.get('order_by')
#     if order_by == None or order_by == "":
#         queryset = Leave.objects.all()
#     else:
#         queryset = Leave.objects.order_by(order_by).all()
#     filter = LeaveFilter(request.GET, queryset=queryset)
#     per_page = request.GET.get('per_page')
#     page = request.GET.get('page')
#     if per_page == None or per_page == "":
#         per_page = 10
#     else:
#         per_page = int(per_page)
#     if page == None or page == "":
#         page = 1
#     else:
#         page = int(page)
#     p = Paginator(filter.qs, per_page)
#     page_list = p.page(page)
#     return render(request=request, template_name="leave/home.html", context={"filter_form": filter, "page_obj": page_list, "page": p})



@login_required()
def leave_home(request):
    order_by = request.GET.get('order_by')
    if order_by == None or order_by == "":
        queryset = Leave.objects.all()
    else:
        queryset = Leave.objects.order_by(order_by).all()
    filter = LeaveFilter(request.GET, queryset=queryset)
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
    page_list = p.page(page)
    search_form = render_to_string("leave/search_form.html", {"form": filter.form})
    print(search_form)
    return JsonResponse({
        "msgType": "success",
        "searchForm": search_form

    })
    # return render(request=request, template_name="leave/home.html", context={"filter_form": filter, "page_obj": page_list, "page": p})






def leave_add(request):
    if request.method == "GET":
        form = LeaveForm()
        return render(request=request, template_name="leave/add_leave.html", context={"form": form})
    if request.method == "POST":
        form = LeaveForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse("success")
    return render(request, 'leave/add_leave.html', {'form': form})