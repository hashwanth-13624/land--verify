import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // The logic now uses camelCase keys to exactly match your Supabase table
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        { 
          // --- SECTION 1 DATA ---
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          panNumber: formData.panNumber,
          aadhaarNumber: formData.aadhaarNumber,
          
          // --- SECTION 2 DATA ---
          // IMPORTANT: The form now sends 'fullPropertyAddress'.
          // Ensure your column is named 'fullPropertyAddress' or rename it here.
          fullPropertyAddress: formData.fullPropertyAddress,
          village: formData.village,
          city: formData.city,
          taluk: formData.taluk,
          district: formData.district,
          surveyNumber: formData.surveyNumber,
          sroLocation: formData.sroLocation,

          // --- SECTION 3 (Basic Details) DATA ---
          propertyType: formData.propertyType,
          propertySize: formData.propertySize,
          expectedPrice: formData.expectedPrice,
          message: formData.message,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({ message: 'Submission received successfully!', data: data });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}