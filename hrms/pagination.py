from rest_framework import pagination
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param  = "page_size"
    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'totalPages': self.page.paginator.num_pages,
            'currentPage': self.page.number,
            'pageSize': self.page.paginator.per_page,
            'startIndex': self.page.start_index(),
            'endIndex': self.page.end_index(),
            'hasPrevious': self.page.has_previous(),
            'hasNext': self.page.has_next(),
            'results': data
        })