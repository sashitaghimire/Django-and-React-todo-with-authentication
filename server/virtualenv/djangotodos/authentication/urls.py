from django.contrib import admin
from django.urls import path, include
from authentication.views import UserRegistrationView, UserLoginView, UserProfileView, UserDetailView, UserLogoutView, CustomTokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name="register"),
    path('login/', UserLoginView.as_view(), name="login"),
    path('profile/', UserProfileView.as_view(), name='profile'),
    # For listing all registered users
    path('user-list/', UserRegistrationView.as_view(), name='user-list'),
    path('user-detail/<int:user_id>/', UserDetailView.as_view(),
         name='user-detail'),  # For individual user operations
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]
