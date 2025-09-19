from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SignupView, UserViewSet, MyTokenObtainPairView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
