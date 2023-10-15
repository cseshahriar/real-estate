from django.contrib import admin
from django.urls import path, include, re_path

from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/accounts', include('accounts.urls')),
    path('admin/', admin.site.urls),
]
# add static and media path in url
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# for react base django template
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]