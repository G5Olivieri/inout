for row in $(cat essencias.json | jq -r -M -c '.[] | @base64'); 
do 
	
	product=$(echo $row | base64 -d)
	curl localhost:8080/api/v1/products -X POST -H 'Content-Type: application/json' -d "$product" -w '\n%{http_code}\n'
done
