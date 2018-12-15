FROM centos:7.2.1511

USER root

RUN rm -rf /etc/yum.repos.d/*.repo && \
    curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo && \
    curl -o /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

RUN yum install -y https://centos7.iuscommunity.org/ius-release.rpm && \
    yum install -y python35u python35u-libs python35u-devel python35u-pip &&\ 
    yum -y install gcc cyrus-sasl-gssapi npm && \
    yum install haproxy gdb python-debuginfo -y && \
    yum -y install net-tools && \
    yum clean all -y

RUN npm config set registry https://registry.npm.taobao.org

RUN mkdir -p /root/.pip/
COPY files/pip.conf  /root/.pip/pip.conf
RUN pip3.5 install --upgrade pip==9.0.3 && pip3.5 install numpy scipy tornado sklearn h5py json-rpc werkzeug

COPY ./code/ /opt/

COPY files/haproxy.cfg /etc/haproxy/haproxy.cfg

WORKDIR /opt

RUN chmod +x /opt/start.sh

EXPOSE 1337 8080

CMD ["/opt/start.sh"]
