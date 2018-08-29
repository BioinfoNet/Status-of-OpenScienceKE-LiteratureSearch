#!/bin/bash

# Searching the PubMed and PMC databases for Open Science papers with Kenyan Affiliations
# esearch -db pubmed -query "open science[keyword] OR \
#	open source[keyword] OR \
#	open data[keyword] OR \
#	open access[keyword] OR \
#	open peer review[keyword] OR \
#	open review[keyword] OR \
#	open notebooks[keyword] OR \
#	open educational resources[keyword] OR \
#	open resource[keyword] OR \
#	citizen science[keyword] OR \
#	scientific social network[keyword]" |
# efetch -format xml |	# Retrieve the xml format of all the articles with Open Science keywords

### Running for loops with Open Science keywords against the PubMed database ###
# A count of the PubMed search results for the corresponding keywords
for kwd in \
	"open science" \
	"open source" \
	"open data" \
	"open code" \
	"open access" \
	"open peer review" \
	"open review" \
	"open notebooks" \
	"open educational resources" \
	"open resource" \
	"citizen science" \
	"scientific social network"
do 
	esearch -db pubmed -query "$kwd[keyword]" |
	efetch -format uid | 
	wc -l > keyCounts.txt
done

# Extract PMIDS, Journal titles, and Author LastNames of each paper, and their respective affiliations into tab separated columns
for kwd in \
	"open science" \
	"open source" \
	"open data" \
	"open code" \
	"open access" \
	"open peer review" \
	"open review" \
	"open notebooks" \
	"open educational resources" \
	"open resource" \
	"citizen science" \
	"scientific social network"
do 
	esearch -db pubmed -query "$kwd[keyword]" |
	efetch -format xml |
	xtract -pattern MedlineCitation -sep "\t" -element MedlineCitation/PMID, Journal/Title -block Author -sep "\t" -element LastName, Affiliation |
	grep "Kenya" | 
	awk '{print $1}' > pmids_all.txt
	
	xtract -pattern PubmedArticle -sep "\t" -element MedlineCitation/PMID, Journal/Title, -first Author Affiliation |
	grep "Kenya"
	awk '{print $1}' > pmids_fa.txt
done
echo -e "\nSearch completed!"

# Articles in the Open Access (OA) subset of PubMed Central (PMC)
# esearch -db pmc -query "$kwd[filter]" | # count: 2110453
# efetch -format xml > pmcOA.txt