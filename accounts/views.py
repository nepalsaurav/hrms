from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import HttpResponse
# Create your views here.


from dal import autocomplete # type: ignore

from .models import CustomUser


# class UserAutocomplete(autocomplete.Select2QuerySetView):
#     def get_queryset(self):
#         # Don't forget to filter out results depending on the visitor !
#         if not self.request.user.is_authenticated:
#             return CustomUser.objects.none()

#         qs = CustomUser.objects.all()

#         if self.q:
#             qs = qs.filter(username__istartswith=self.q)

#         return qs
    
def AutoComplete(request):
    if request.GET.get("q") == None or request.GET.get("q") == "":
        return JsonResponse([], safe=False)
    if not request.user.is_authenticated:
        return JsonResponse([], safe=False)
    qs = CustomUser.objects.filter(username__istartswith=request.GET.get("q"))
    list = []
    for q in qs:
        list.append(q.username)
    print(list)
    return JsonResponse(list, safe=False)
