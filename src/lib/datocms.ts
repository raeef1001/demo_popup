type FormContent = {
  title: string;
  subtitle: string;
  firstNameLabel: string;
  companyEmailLabel: string;
  companyNameLabel: string;
  locationPreferenceLabel: string;
  spaceRequirementLabel: string;
  submitButtonText: string;
};

export async function getFormContent(): Promise<FormContent> {
  const DATOCMS_API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;
  console.log('DATOCMS_API_TOKEN:', DATOCMS_API_TOKEN);
  const query = `
    query GetFormContent {
      quoteform {
       title
        subtitle
        firstnamelabel
        companyemaillabel
        companynamelabel
       locationpreferencelabel
       spacerequirementlabel
       submitbuttontext
      }
    }
  `;

  try {
    console.log('Making request to DatoCMS...'); 
    const response = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    console.log('Response status:', response.status);
    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from DatoCMS: ${response.status} ${responseText}`);
    }

    const json = JSON.parse(responseText);
    
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }
    const data = json.data.quoteform;
    console.log('Fetched data from DatoCMS:', data);

    // Map the DatoCMS field names to our expected format
    return {
      title: data.title || 'Get a Quote',
      subtitle: data.subtitle || 'Tell us about your space requirements and we\'ll get back to you with a custom quote.',
      firstNameLabel: data.firstnamelabel || 'First Name',
      companyEmailLabel: data.companyemaillabel || 'Company Email',
      companyNameLabel: data.companynamelabel || 'Company Name',
      locationPreferenceLabel: data.locationpreferencelabel || 'Location Preference',
      spaceRequirementLabel: data.spacerequirementlabel || 'Space Requirement',
      submitButtonText: data.submitbuttontext || 'Submit Quote Request',
    };
  } catch (error) {
    console.error('Detailed error:', error);
    // Return default content as fallback
    return {
      title: 'Get a Quote',
      subtitle: 'Tell us about your space requirements and we\'ll get back to you with a custom quote.',
      firstNameLabel: 'First Name',
      companyEmailLabel: 'Company Email',
      companyNameLabel: 'Company Name',
      locationPreferenceLabel: 'Location Preference',
      spaceRequirementLabel: 'Space Requirement',
      submitButtonText: 'Submit Quote Request',
    };
  }
}