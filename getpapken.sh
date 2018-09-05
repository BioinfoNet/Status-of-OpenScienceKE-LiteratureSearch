#!/bin/bash
###	-----START OF GETPAPKEN FUNCTION-----	###
getKenAffpapers() { 
mkdir -p output input
file1="output/*KE.txt searchwds.txt input/*KE.txt"
qrmk() {
for f
do
   [ -e "$f" ] && rm "$f"
done
        }
qrmk $file1
# Search PubMed for keywords and count the number of PMIDs found against each keyword
# NB: Note that keycounts file for all search strategies will have the same content 
#     because initial search for the input word/phrase is global and has no conditions
for wd
do
	esearch -db pubmed -query "$wd" |
	 efetch -format uid | 
	  wc -l >> output/keyCountKE.txt
	  echo "$wd" >> searchwds.txt
	  paste searchwds.txt output/keyCountKE.txt > output/CountKE.txt
	esearch -db pubmed -query "$wd" |
	 efetch -format xml >> input/opSciKE.txt
done

# Extract PMIDS of all papers with author affiliation contatining "Kenya"
xtract -input input/opSciKE.txt -pattern PubmedArticle -PMID MedlineCitation/PMID \
-block Affiliation -if Affiliation -contains "Kenya" \
-tab "\n" -element "&PMID" | \
 sort -n | uniq > input/pmid1KE.txt
 cat input/pmid1KE.txt | xargs | sed 's/ /,/g' > input/pmid1KE.txt
 
# Extract PMIDS of all papers with first author affiliation contatining "Kenya"
xtract -input input/opSciKE.txt -pattern PubmedArticle -PMID MedlineCitation/PMID \
-block Affiliation -if Affiliation -position first -contains "Kenya" \
-tab "\n" -element "&PMID" | \
 sort -n | uniq > input/pmid2KE.txt
 cat input/pmid2KE.txt | xargs | sed 's/ /,/g' > input/pmid2KE.txt
 
# Fetch (download) the papers using the PMIDs previously fetched
for ID1 in "$(cat input/pmid1KE.txt)" 
do
	  efetch -db pubmed -id "$ID1" -format xml >> output/papers1KE.txt
done
for ID2 in "$(cat input/pmid2KE.txt)"
do
      efetch -db pubmed -id "$ID2" -format xml >> output/papers2KE.txt
done
#rm -r searchwds.txt
}
echo -e """
	getKenAffpapers is now active!
	"""
###	-----END OF GETPAPKEN FUNCTION-----	###
