#!/bin/bash
mkdir -p output input
file1="output/*.txt input/*.txt"
qrm() {
  for f
  do
    [ -e "$f" ] && rm "$f"
  done
}
qrm $file1
# Search PubMed for keywords and count the number of PMIDs found against each keyword
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
	  wc -l >> output/keyCounts.txt
	esearch -db pubmed -query "$kwd[keyword]" |
	 efetch -format xml >> input/opSci.txt
done
file2="pmids*"
qrm() {
  for f
  do
    [ -e "$f" ] && rm "$f"
  done
}
qrm $file2
# Extract PMIDS of all papers with author affiliation contatining "Kenya"
xtract -input input/opSci.txt -pattern PubmedArticle -PMID MedlineCitation/PMID \
 -block Affiliation -if Affiliation -contains "Kenya" \
  -tab "\n" -element "&PMID" | \
 sort -n | uniq > input/pmids1.txt
 cat input/pmids1.txt | xargs | sed 's/ /,/g' > input/pmids1.txt
# Extract PMIDS of all papers with first author affiliation contatining "Kenya"
xtract -input input/opSci.txt -pattern PubmedArticle -PMID MedlineCitation/PMID \
 -block Affiliation -if Affiliation -position first -contains "Kenya" \
  -tab "\n" -element "&PMID" | \
 sort -n | uniq > input/pmids2.txt
 cat input/pmids2.txt | xargs | sed 's/ /,/g' > input/pmids2.txt
# Fetch (download) the papers using the PMIDs previously fetched
for ID1 in "$(cat input/pmids1.txt)"
  do
	efetch -db pubmed -id "$ID1" -format xml >> output/papers1.txt
done
for ID2 in "$(cat input/pmids2.txt)"
  do
	efetch -db pubmed -id "$ID2" -format xml >> output/papers2.txt
done
echo -e "\nSearch completed!"