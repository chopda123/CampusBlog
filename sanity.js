 import { createClient } from "next-sanity";
 import createImageUrlBuilder from "@sanity/image-url";
// import { config } from "process";

// here we get the all value from env file , it it will be encrepated 

 const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
 const dataset =  process.env.NEXT_PUBLIC_SANITY_DATASET;
 const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

// here we export the above values

 export const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn :true , }

// now will give above value acess to the sanityclient 

export const sanityClient = createClient(config);
// can call images from sanity
export const urlFor = (source) => createImageUrlBuilder(config).image(source)