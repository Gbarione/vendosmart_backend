API_URL="http://localhost:8090"
JOB_ENDPOINT="/job"
VENDOR_ENDPOINT="/vendor"
USERNAME="vs_tech_challenge"
PASSWORD="SuperSecurePassword123@"

# Base64 encode the credentials
AUTH_HEADER=$(echo -n "$USERNAME:$PASSWORD" | base64)

create_job() {
    local location_id=$1
    local category_id=$2
    local job_data='{"locationId": '$location_id', "categoryId": '$category_id'}'
    echo "Creating job: $job_data"
    curl -s -X POST \
         -H "Content-Type: application/json" \
         -H "Authorization: Basic $AUTH_HEADER" \
         -d "$job_data" \
         "${API_URL}${JOB_ENDPOINT}"
    echo
    echo "------------------------"
}

create_vendor() {
    local name="$1"
    local location_id=$2
    shift 2
    local services=("$@")

    # Prepare services array
    services_json=""
    for service in "${services[@]}"; do
        IFS=':' read -r category_id compliant <<< "$service"
        services_json+="$(printf '{"categoryId": %d, "compliant": %s},' "$category_id" "$compliant")"
    done
    services_json="[${services_json%,}]"

    vendor_data=$(printf '{"name": "%s", "locationId": %d, "services": %s}' "$name" "$location_id" "$services_json")

    echo "Creating vendor: $name"
    echo "Vendor data: $vendor_data"

    response=$(curl -s -X POST \
         -H "Content-Type: application/json" \
         -H "Authorization: Basic $AUTH_HEADER" \
         -d "$vendor_data" \
         "${API_URL}${VENDOR_ENDPOINT}")

    echo "Response: $response"
    echo "------------------------"
}

echo "Starting job creation"

# Job 1
create_job 10 4

# Job 2
create_job 10 2

# Job 3
create_job 1 2

echo "Job creation completed"

echo "Starting vendor creation"

# Vendor 1
create_vendor "Vendor 1" 10 "4:false" "2:false"

# Vendor 2
create_vendor "Vendor 2" 10 "2:false"

# Vendor 3
create_vendor "Vendor 3" 10 "2:true"

# Vendor 4
create_vendor "Vendor 4" 1 "4:true"

# Vendor 5
create_vendor "Vendor 5" 1 "2:false"

# Vendor 6
create_vendor "Vendor 6" 1 "2:true"

echo "Vendor creation completed"