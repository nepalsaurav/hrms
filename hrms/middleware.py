def TurboMiddleware(get_response):
    def middleware(request):
        response = get_response(request)
        if request.path.startswith('/admin/') and request.method == 'POST':
            if response.status_code == 200:
                response.status_code = 422
            elif response.status_code == 301:
                response.status_code = 303
        return response

    return middleware


from django.utils.deprecation import MiddlewareMixin

class DisableCSRFMiddleware(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)


def CacheControlMiddleware(get_response):
    def middleware(request):
        response = get_response(request)
        if "HX-Request" in request.headers:
            response["Cache-Control"] = "no-store, max-age=0"
        return response
    return middleware