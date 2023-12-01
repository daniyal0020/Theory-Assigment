import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CVScreen = () => {
  const [cvData, setCvData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCvDataString = await AsyncStorage.getItem('cvData');
        if (storedCvDataString) {
          const storedCvData = JSON.parse(storedCvDataString);
          setCvData(storedCvData);
        }
      } catch (error) {
        console.error('Failed to fetch CV data from AsyncStorage:', error);
      }
    };

    fetchData();
  }, []);

  if (!cvData) {
    return <Text>Loading CV data...</Text>;
  }

  const { personalInfo, contactInfo, education, workExperience, skills } = cvData;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your CV</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Info</Text>
        <Text>Name: {personalInfo.name}</Text>
        <Text>Program: {personalInfo.program}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contact Information</Text>
        <Text>Email: {contactInfo.email}</Text>
        <Text>Phone Number: {contactInfo.phoneNumber}</Text>
        <Text>Address: {contactInfo.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Education</Text>
        <Text>Degree: {education.degree}</Text>
        <Text>University: {education.university}</Text>
        <Text>Graduation Date: {education.graduationDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Work Experience</Text>
        {workExperience.map((experience, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text>{experience.company} - {experience.position}</Text>
            <Text>Duration: {experience.duration}</Text>
            <Text>Responsibilities: {experience.responsibilities}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Skills</Text>
        {skills.map((skill, index) => (
          <Text key={index}>{skill}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 10,
  },
});

export default CVScreen;