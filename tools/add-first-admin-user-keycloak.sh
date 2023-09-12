#!/bin/bash

docker compose exec keycloak /opt/jboss/keycloak/bin/add-user-keycloak.sh -u admin -p admin
