#!/bin/bash
###	-----START OF GETPAPSA FUNCTION-----	###
getSAffpapers() { 
mkdir -p output input
file2="output/*SA.txt searchwds.txt input/*SA.txt"
qrms() {
for f
do
   [ -e "$f" ] && rm "$f"
done
        }
qrms $file2 
# Search PubMed for keywords and count the number of PMIDs found against each keyword
# NB: Note that keycounts file for all search strategies will have the same content 
#     because initial search for the input word/phrase is global and has no conditions
for wd
do
	esearch -db pubmed -query "$wd" |
	 efetch -format uid | 
	  wc -l >> output/keyCountSA.txt
	  echo "$wd" >> searchwds.txt
	  paste searchwds.txt output/keyCountSA.txt > output/CountSA.txt
	esearch -db pubmed -query "$wd" |
	 efetch -format xml >> input/opSciSA.txt
done

# Extract PMIDS of all papers with author affiliation contatining "South Africa"
xtract -input input/opSciSA.txt -pattern PubmedArticle -PMID MedlineCitation/PMID \
-block Affiliation -if Affiliation -contains "South Africa" \
-tab "\n" -element "&PMID" | \
 sort -n | uniq > input/pmid1SA.txt
 cat input/pmid1SA.txt | xargs | sed 's/ /,/g' > input/pmid1SA.txt
 
# Extract PMIDS of all papers with first author affiliation contatining "South Africa"
xtract -input input/opSciSA.txt -pattern PubmedArticle -PMID MedlineCitation/PMID \
-block Affiliation -if Affiliation -position first -contains "South Africa" \
-tab "\n" -element "&PMID" | \
 sort -n | uniq > input/pmid2SA.txt
 cat input/pmid2SA.txt | xargs | sed 's/ /,/g' > input/pmid2SA.txt
 
# Fetch (download) the papers using the PMIDs previously fetched
for ID1 in "$(cat input/pmid1SA.txt)" 
do
	  efetch -db pubmed -id "$ID1" -format xml >> output/papers1SA.txt
done
for ID2 in "$(cat input/pmid2SA.txt)"
do
      efetch -db pubmed -id "$ID2" -format xml >> output/papers2SA.txt
done
#rm -r searchwds.txt
}
echo -e """
	getSAffpapers is now active!
	"""
###	-----END OF GETPAPSA FUNCTION-----	###
