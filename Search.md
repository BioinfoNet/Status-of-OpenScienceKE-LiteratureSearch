# Potential Strategies and Sources for Literature Search
Proper scanning for literature on Open Science in Kenya will require robust search strategies and particular careful choice of keywords.

A great place to start would be the 'Open Science facets as a beehive' from FOSTER (https://www.fosteropenscience.eu/content/what-open-science-introduction)

![](https://www.fosteropenscience.eu/sites/default/files/images/OpenScienceBuildingBlocks.JPG)

## Search Terms/Keywords
Using the Open Science terms on the figure as keywords, we could search various literature databases for Open Science Papers in general.

Then, using specific filters, we could fine tune our search to include only papers published by researchers in Kenyan institutions.

This may require some processing. You are welcome to suggest advanced search or filter options.

## Some Places to Look
* [PubMed](https://www.ncbi.nlm.nih.gov/pubmed)
* [PubMed Central](https://www.ncbi.nlm.nih.gov/pmc/)(PMC)
* [Directory of Open Access Journals](https://doaj.org/)(DOAJ)
* [JAMA](https://jamanetwork.com/)
* [SCOPUS](https://www.elsevier.com/solutions/scopus)/ELSEVIER
* [African Journas Online](https://www.ajol.info/)
* [arXiv](https://arxiv.org/)
* [BioOne](http://www.bioone.org/)
* [Bioinformatic Harvester](https://links.bioinformatics.ca/links_directory/tool/9872/harvester)
* [Europe PMC](https://europepmc.org/)
* [Google Scolar](https://scholar.google.com/)
* [GoPubMed](https://library.tmc.edu/database/gopubmed/)
* [Mendeley](https://www.mendeley.com/)
* [ScienceOpen](https://www.scienceopen.com/)
* [Science Direct](https://www.sciencedirect.com/)/ELSEVIER
* [SpringerLink](https://link.springer.com/)
* [F1000Research](https://f1000research.com/)
* etc

### Searching the PubMed and PMC databases for Open Science papers with Affiliations to Kenyan institutions

```
$ esearch -db pubmed -query "open science[keyword] OR \
	open source[keyword] OR \
	open data[keyword] OR \
	open access[keyword] OR \
	open peer review[keyword] OR \
	open review[keyword] OR \
	open notebooks[keyword] OR \
	open educational resources[keyword] OR \
	open resource[keyword] OR \
	citizen science[keyword] OR \
	scientific social network[keyword]" |
  efetch -format xml | xtract...
```

This code searchers the PubMed database for the papers with the various keywords and pipes the search result into the ```xtract``` command

NCBI's EDirect tool for Unix environments can extract valuable information from xml files.

### Running for loops with Open Science keywords against the PubMed database

A count of the PubMed search results for the corresponding keywords

```
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
```

### Extracting PMIDS, Journal titles, and Author LastNames of each paper, and their respective affiliations into tab separated columns

```
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
```

The result of this code is piped into the next command

### Printing all lines of papers with author affiliations in Kenya. These would represent open science studies with Kenyan affiliate(s) whether conducted at a Kenyan institution or not

```
grep "Kenya" | 
```

The result of this command is piped into the next command

### Printing and saving the PubMed ID of such papers in a pmids.txt file for subsequent abstract/full text retrieval

```
awk '{print $1}' > pmids_all.txt
```

### Extracting all PMIDS, Journal titles, the last names of only first authors of each paper, and their respetive affiliations into tab separated columns

```
xtract -pattern PubmedArticle -sep "\t" -element MedlineCitation/PMID, Journal/Title, -first Author Affiliation |
```

### Print only lines with first authors in Kenyan institutions. This would represent Open Science studies conducted at Kenyan institutions

```
grep "Kenya"
```

### Print the PubMed ID of such papers

```
awk '{print $1}' > pmids_fa.txt

done
```

### Articles in the Open Access (OA) subset of PubMed Central (PMC)

```
esearch -db pmc -query "$kwd[filter]" |
efetch -format uid > pmcid.txt
```

After running this code, we should be able to retrieve the papers in PubMed on Open Science with specific insd
