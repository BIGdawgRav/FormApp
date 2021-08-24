#FormApp Backend
To run on local machine:
0. Start your own venv using
        git clone <repo>
        cd <repo>
        python3 -m venv <environment_name>
        source <environment_name>/bin/activate

1. To setup on your own machine/VM, install the requirements using
        pip3 install -r iStaffAppBackend/requirements.txt
Then do the same for the frontend.

2. To run use
	source launch.sh
  	 python3 manage.py runserver

3. To stop the venv simply do;
        deactivate
