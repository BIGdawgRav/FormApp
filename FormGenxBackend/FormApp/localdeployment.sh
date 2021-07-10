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
export CORS_ALLOWED_ORIGIN='localhost'
export SERVER_TIME_OFFSET=0 # Local server offset is 0.


echo "             ############"
echo "             !!! Done !!!"
echo "             ############"