from fabric.api import sudo, env, task
from fabric.contrib.project import rsync_project
from fabric.operations import put

production_pi = '192.168.1.14'

env.user = 'pi'
env.hosts = [production_pi]

@task
def production_webapp():
    env.remote_dir = '/home/pi/home-temp-webapp/source/'
    env.local_dir = '/home/andraz/Projects/home-temp-webapp/'

    env.nginx = 'home-temp-webapp/source/conf/nginx.home-temp-webapp.production.conf'
    env.nginx_file = 'nginx.home-temp-webapp.production.conf'


@task
def deploy(nginx=False):
    """
    Take local project, upload it to the server with the right configuration. Then check flags and install requirements,
    update supervisor configuration and update nginx configuration.
    """
    rsync_project(remote_dir=env.remote_dir, local_dir=env.local_dir + 'dist/')

    if nginx:

        put(remote_path=env.remote_dir, local_path=env.local_dir + 'conf/')
        sudo('cp /home/pi/{} /etc/nginx/sites-available/'.format(env.nginx))
        try:
            sudo('rm /etc/nginx/sites-enabled/{}'.format(env.nginx_file))
        except:
            print("Nginx configuration is not linked... proceeding.")

        sudo('ln -s /etc/nginx/sites-available/{} /etc/nginx/sites-enabled/'.format(env.nginx_file))
        sudo('nginx -s reload')
        sudo('nginx -t')
