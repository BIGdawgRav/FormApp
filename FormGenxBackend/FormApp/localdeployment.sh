#!/bin/bash

echo "#####################################"
echo "!!! Exporting important env vars. !!!"
echo "#####################################"

# Environment vars.
export SECRET_KEY='bntqgoz3b_kc5@)#y%(hzj6_kv2-s14bh=k!hkc_x%dzzbl==t'
export DEBUG=True
export ALLOWED_HOSTS='127.0.0.1,,localhost,testserver'
export DEBUG_PROPAGATE_EXCEPTIONS='True'
export DEFAULT_RENDERER_CLASS='rest_framework.renderers.JSONRenderer'
export CORS_ALLOWED_ORIGIN_REGEXES='(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?),'
export CORS_ALLOWED_ORIGINS='http://localhost:3000'
export SERVER_TIME_OFFSET=0 # Local server offset is 0.
export MONGO_USERNAME="Raveen"
export MONGO_PASSWORD="8VBCDyi6BkL3vh"


export EMAIL_HOST='smtp.gmail.com'
export EMAIL_PORT=587
export EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend'
export EMAIL_USE_TLS=True
export EMAIL_HOST_USER='formgenxnotifications@gmail.com'
export EMAIL_HOST_PASSWORD='gq9gVpLy6HkaiJ'

echo "             ############"
echo "             !!! Done !!!"
echo "             ############"