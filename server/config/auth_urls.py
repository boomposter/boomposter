from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import (
    LoginView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
    UserDetailsView,
)
from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

# URLs that do not require a token
urlpatterns = [
    path("login/", LoginView.as_view(), name="rest_login"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("token/refresh/", get_refresh_view().as_view(), name="token_refresh"),
    # path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    # path("password/reset/confirm/", PasswordResetConfirmView.as_view(), name="rest_password_reset_confirm"),
]

# URLs that require a user to be logged in with a valid token
urlpatterns += [
    # Retrive (GET) or update (PUT/PATCH) authenticated user details
    path("user/", UserDetailsView.as_view(), name="rest_user_details"),
    # path("password/change/", PasswordChangeView.as_view(), name="rest_password_change"),
]

# Registration endpoints
urlpatterns += [
    path("register/", RegisterView.as_view(), name="rest_register"),
    # Email is disabed
    # path('verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    # path('resend-email/', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    # re_path( r'^account-confirm-email/(?P<key>[-:\w]+)/$', lambda: None, name='account_confirm_email',),
    # path( 'account-email-verification-sent/', lambda: None, name='account_email_verification_sent',),
]
