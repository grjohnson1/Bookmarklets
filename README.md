# Bookmarklets
Original plan is to create Bookmarklets that will store a Job posting information locally (simple TXT file) for your job hunting reference.

I have been job hunting for over a year with a lot of ghost responses. So I have established standards that will help me capture information and be able to reference it at a future date as job postings will expire and be removed from sites. This will allow for you to run all types of analytics and keyword usage across all the files using AI.

Along the same lines I have been updating a Google Sheet with all the jobs that I have applied to and the date I have applied. So capturing a comma-delimited version of the data would be helpful as well.

## Processing
The script will attempt to identify where the Job Posting is from so that it can extract the data appropriately based on the Job Board.

Currently this will work for Ashby, Greenhouse, Lever, and Workday job boards. It is recommended to open the direct posting in its own tab as iframes, and other wrappers could hinder the code ability to scrape the content.

**I am running through many use cases but there may be items that haven't been played out. Please verify the data captured.**

Let me know if there are any new Job Boards or issues experience by providing me some detail and the URL.

Thanks,
Gregg

## Output
1. Creates a .TXT file to be stored locally.
    - filename format: YYYYMMDD - Company Name -- Job Title.txt
        - example: 20260304 - S&P Global -- Senior Engineer.txt
        - YYYYMMDD is the current date
    - TXT file will include the following:
    ```
    Company Name

    Job Title/Position
    Location
    Pay: (attempt to extract pay if found; tricky if company doesn't provide)

    URL

    [full description...]
    ```

2. Extract information into Google Sheets to help track Application submission and Response information. This will be a pop-up where you can click on "Copy CSV" to Copy.
    - It is recommended to paste the contents of the "Copy CSV" into the first cell on an empty row. Clicking on the cell just oncce will do. Pasting here will show an icon of a drop-down to appear next to the row you in Google Sheets. Be sure to select "Split text to columns" to have the content fill up the columns as expected.
    - The content will be comma-delimited and resemble below
    ```
    "Company Name","Job Title","Job_Posting_URL","location[s]","","","Pay","Applied_Date","Open"
    ```
    - Note that the layout suits my Google Sheet layout and may not match your needs.
    - Type and Mode are drop-down.
    - Sent is date you applied which is the date of capture for the bookmarklet.
    - Responce is to track Company responses. Initially it is set to "Open".

| Company| Position | Link | Location | Type | Mode | Pay (range) | Sent | Response |
|---|---|---|---|---|---|---|---|---|

3. Output Notes:
    - The Pay will capture patterns similar to the following and converts it to "$# to $#". It takes first match in the full description, so if there are multiple pay lines as some do with Zone A, B, C, it may not capture the one you want. So change accordingly.
    ```
    $85,000 - $105,000
    $85,000–$105,000
    $155,000 and $233,000
    $80k to $120k
    $32.50 - $45.25
    ```  
<hr style="border:2px solid gray"> </hr>

## Create Bookmarklet folder
1. Before you get started go to your Bookmark Manager.
2. Create a new folder with the name Bookmarklets.

## Process to identify and create the TXT file along with the text copy for Google Sheet (CSV)
3. Add a new bookmark to reside in Bookmarklets folder named "Job Posting Extract" (or a name you like).
4. Go to "Singleline_Bookmarklet.js" and copy the code.
5. Use that code as the URL for the bookmark "Job Posting Extract".
6. While on the Job Posting page in the browser of your choice click on this bookmarklet.
<hr style="border:2px solid gray"> </hr>

## See Readable version
Check out "Job_Posting_to_TXT_and_CSV.js" for the readable version of the code to see how the processing happens. Feel free to copy and alter as you see fit.

For example the following code lays out the CSV or Google Sheet column order:
```
const csvContent = [
    uniqueData.companyName,
    jobTitle,
    commonData.url,
    uniqueData.location,
    "",
    "",
    pay,
    commonData.csvDate,
    "Open"
].map(csvEscape).join(",");
```
So you would just need to move up jobTitle above uniqueData.companyName if you want the columns to be "Job Title","Company Name". Be sure to collapse to a singleline to place as your bookmarklet.
<hr style="border:2px solid gray"> </hr>

## Bookmarklet List
Other potential Bookmarklets based on my single job posting tests are below:

### Workday Job Posting
Say you found a job you're interested in applying to that is on a Lever site.
URL example: https://company_name.wd3.myworkdayjobs.com/

1. Go to "Workday_Job_Posting.js" and copy the code.
2. Create a bookmark with this code as the URL.
3. Give it the name "Workday Job Posting".
4. While on the Job Posting page in the browser of your choice click on the bookmarklet.

<hr style="border:2px solid gray"> </hr>

### Greenhouse Job Posting
Say you found a job you're interested in applying to that is on a Greenhouse site.
URL example: https://job-boards.greenhouse.io/company_name/

1. Go to Greenhouse_Job_Posting.js and copy the code.
2. Create a bookmark with this code as the URL.
3. Give it the name "Greenhouse Job Posting".
4. While on the Job Posting page in the browser of your choice click on the bookmarklet.

<hr style="border:2px solid gray"> </hr>

### Lever Job Posting
Say you found a job you're interested in applying to that is on a Lever site.
URL example: https://jobs.level.co/company_name/

1. Go to Lever_Job_Posting.js and copy the code.
2. Create a bookmark with this code as the URL.
3. Give it the name "Lever Job Posting".
4. While on the Job Posting page in the browser of your choice click on the bookmarklet.

<hr style="border:2px solid gray"> </hr>

### Asyby Job Posting
Say you found a job you're interested in applying to that is on a Lever site.
URL example: https://jobs.ashbyhq.com/company_name/

1. Go to Asyby_Job_Posting.js and copy the code.
2. Create a bookmark with this code as the URL.
3. Give it the name "Asyby Job Posting".
4. While on the Job Posting page in the browser of your choice click on the bookmarklet.

<hr style="border:2px solid gray"> </hr>