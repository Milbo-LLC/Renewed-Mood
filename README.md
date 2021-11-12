# Renewed-Mood

## Predictive analytic mood and emotion journal.

## Description

Renewed Mood is a mobile app for helping to track and improve your mood. You can use it to make video, audio and text entries and classify those entries based on your mood and emotions. Renewed Mood uses "Plutchik's Wheel of Emotions" as a base for classifying the emotions of users.

Renewed Mood is in it's early stages of development and a lot is planend for the future of this application. To see more details visit the Github page at the link below.

## Front-End

The front end for Renewed Mood is written in Javascript using the React-Native library. Users first log in to an existing account or create a new account through a sign-in / sign-up form. Once logged into the app, the user is first taken to the video entry page. Users can navigate to audio and text entry pages as well. Video, audio and text data is saved to the cloud using an Amazon S3 bucket. As entries are saved the data is automatically uploaded to the cloud. Entries can be deleted after creation, and deleteing entries will automatically delete the entry from the S3 bucket. After a user finishes the video, audio or text entry they are prompted to classify their entry through a mood / emotion questionaire. If the user chooses to classify their entry they will be asked to rate their mood and emotions based off of Plutchik's Wheel of Emotions. After the classification is complete, or the user declines to clasify the entry, the user is taken back to the entry form. They can navigate to the Entries View to view all of the entries they create. Entries are color coated based on the mood rating entered for the entry. If the entry wasn't classified, it will show up in grey. Users can click entries to see an expanded version with more details on the entry. Users can also hold down an entry to bring up a delete button for removing the entry.

## Back-End

The back end for Renewed Mood is written in Javascript and set up using the AWS CLI (Amazon Web Services Command Line Interface). The AWS CLI was used to set up an Amazon Cognito User Pool for storing authenticating and storing user data. The AWS CLI was also used to set up an Amazon Simple Storage Service (Amazon S3) bucket for handling the storage of video, audio and text entries of each user. Data is planned to be used for training Machine Learning (ML) models for gathering insight about a users mood and to assist in improving the mood of users.
