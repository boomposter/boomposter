from rest_framework.pagination import PageNumberPagination


class AdSpacePagination(PageNumberPagination):
    """Response data pagination for adspace."""

    page_size = 50
    max_page_size = 50
    page_query_param = "page"
    page_size_query_param = "page_size"
