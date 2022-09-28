# COVID-19-Detection
Developed by @Dedeepya Yarlagadda @Siddarth Saxena @Madhavi Peechara @Niharika Sirapurapu

# Description
Internationally, COVID-19 is spreading and has a high mortality rate. As a result, the WHO(World Health Organization) classified it as a pandemic. A rapid and correct diagnosis is necessary to reduce illness transmission. To recognize the illness, a converse record polymerase chain response (RT-PCR) test is oftentimes performed. In any case, since this test takes time, a chest registered tomography (CT) or plain chest X-Ray (CXR) is sporadically suggested. These are regarded problems, and a convolutional neural network will be built to replace these loops. Thus, we recommend a plan for making Artificial Intelligence calculations for COVID-19 discovery and ID that further develop the order capacity of COVID-19 cases. Rapid diagnosis of COVID-19 symptoms is the need of the hour and to this end, automated diagnosis has been preferred over manual diagnostic methodologies to effectively identify and combat the virus.

# Environment
- Colab
- Numpy
- Matplotlib
- Keras

# Setup
$ !pip install visualkeras

# Data set
1152 CT scans were included in the data set, of which 576 belonged to COVID-19 patients and 576 to non-COVID-19 patients. Current Model is trained in a way that uses 920 images as training data and 232 images as testing data. Uniformity between positive and normal samples is being maintained in both train and test data. All of these images were gathered from Open source and are given due credit. An RT–PCR test was used to confirm the illness status of suspected individuals in this set. The CT scans of selected COVID-19 patients and their counterparts with probable illness are shown in the figure.

![ct](https://user-images.githubusercontent.com/48832097/192731732-43282965-ca47-4090-86f8-d69194d4d5b1.png)

# Convolutional Neural Network Model
![Image](https://user-images.githubusercontent.com/48832097/192733045-c30f2a1d-27c3-4df2-a3eb-7c0038731d5e.jpeg)



# Output
![covid](https://user-images.githubusercontent.com/48832097/192710695-36c39b8b-a228-4937-aad4-a31227ae96e7.png)
![negative](https://user-images.githubusercontent.com/48832097/192710656-2f6c683b-7746-48f4-92af-60fc27f95f93.png)
