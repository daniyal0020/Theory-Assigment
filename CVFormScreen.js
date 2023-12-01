import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const CVFormScreen = () => {
  const [personalInfo, setPersonalInfo] = useState({ name: '', subheader: '' });
  const [contactInfo, setContactInfo] = useState({ email: '', phoneNumber: '', address: '' });
  const [education, setEducation] = useState({ degree: '', university: '', graduationDate: '' });
  const [workExperience, setWorkExperience] = useState([
    { position: '', company: '', duration: '', responsibilities: '' },
  ]);
  const [skills, setSkills] = useState(['']);

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactInfoChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleEducationChange = (field, value) => {
    setEducation((prev) => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };

  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleAddExperience = () => {
    setWorkExperience([...workExperience, { position: '', company: '', duration: '', responsibilities: '' }]);
  };

  const handleRemoveExperience = (index) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience.splice(index, 1);
    setWorkExperience(updatedWorkExperience);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleSubmit = () => {
    // Log the form data for now, you can replace this with the logic to save to AsyncStorage
    console.log({
      personalInfo,
      contactInfo,
      education,
      workExperience,
      skills,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your CV</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Personal Info</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={personalInfo.name}
          onChangeText={(value) => handlePersonalInfoChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Subheader"
          value={personalInfo.subheader}
          onChangeText={(value) => handlePersonalInfoChange('subheader', value)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Contact Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={contactInfo.email}
          onChangeText={(value) => handleContactInfoChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={contactInfo.phoneNumber}
          onChangeText={(value) => handleContactInfoChange('phoneNumber', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={contactInfo.address}
          onChangeText={(value) => handleContactInfoChange('address', value)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Education</Text>
        <TextInput
          style={styles.input}
          placeholder="Degree"
          value={education.degree}
          onChangeText={(value) => handleEducationChange('degree', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="University"
          value={education.university}
          onChangeText={(value) => handleEducationChange('university', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Graduation Date"
          value={education.graduationDate}
          onChangeText={(value) => handleEducationChange('graduationDate', value)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Work Experience</Text>
        {workExperience.map((experience, index) => (
          <View key={index} style={styles.experienceItem}>
            <TextInput
              style={styles.input}
              placeholder="Position"
              value={experience.position}
              onChangeText={(value) => handleExperienceChange(index, 'position', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Company"
              value={experience.company}
              onChangeText={(value) => handleExperienceChange(index, 'company', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Duration"
              value={experience.duration}
              onChangeText={(value) => handleExperienceChange(index, 'duration', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Responsibilities"
              value={experience.responsibilities}
              onChangeText={(value) => handleExperienceChange(index, 'responsibilities', value)}
            />
            <TouchableOpacity onPress={() => handleRemoveExperience(index)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={handleAddExperience}>
          <Text style={styles.addButton}>Add Experience</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Skills</Text>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <TextInput
              style={styles.input}
              placeholder="Skill"
              value={skill}
              onChangeText={(value) => handleSkillsChange(index, value)}
            />
            <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={handleAddSkill}>
          <Text style={styles.addButton}>Add Skill</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E90FF',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  addButton: {
    color: 'green',
    marginTop: 5,
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    width: 100,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  experienceItem: {
    marginBottom: 10,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default CVFormScreen;
