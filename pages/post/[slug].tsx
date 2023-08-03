import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { sanityClient, urlFor } from '../../sanity'
import { post } from '../../typings'
import { GetStaticProps } from 'next'
import  PortableText  from 'react-portable-text'
import {useForm , SubmitHandler} from 'react-hook-form'
import comment from '../../personalblog/schemas/comment' 
// import post from '../../personalblog/schemas/post'



interface Props{
    post:post  
};
 type Inputs = {
    _id: string;
    name : string;
    email: string;
    comment : string;
 };

 
const Post =({post}:Props)=> {
    const[submitted,setSubmitted] = useState(false);
    const { register, handleSubmit,  formState: { errors } ,
    } = useForm<Inputs>();  

    const onSumbit : SubmitHandler<Inputs> = (data) =>{
        // console.log(data)
        fetch("/api/createComment" , {
            method: "POST",
            body:JSON.stringify(data),

        }).then(()=>{
            setSubmitted(true);
        }).catch((err)=>{
            setSubmitted(false);
        });

    };

  return (
    <div>
    <Header/>
        {/* main image */}
        <img 
        className='w-full h-96 object-cover p-0 ' 
        src={urlFor(post.mainImage).url()!} 
        alt="coverImage" />
        {/* Artical */}
        <div className='max-w-3xl mx-auto mb-10'>
           <article className='w-full mx-auto p-5 bg-secondaryColor/10'>
            <h1 className='font-titleFont font-medium text-[32px] 
            text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3'>
                {post.title}
            </h1>
            <h2 className='font-bodyfont text-[18px] text-gray-500 mb-2' >
                {post.description}
            </h2>
            <div className='flex items-center gap-2'>
                <img 
                    className='rounded-full w-12 h-12 object-cover bg-red-400'
                    src={urlFor(post.author.image).url()} 
                    alt="authorImg" 
                />
                <p className='font-bodyFont text-base'>
                    Blog post by 
                    <span className='font-bold text-secondaryColor'>
                        {post.author.name}
                    </span>{" "}- 
                    published at {new Date(post.publishedAt).toLocaleDateString()}
                    
                </p>
            </div>

             <div className='mt-10'>
                
                <PortableText                 
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t1678sq6"}
                    content={post.body}
                    serializers={{
                        h1:(props: any)=>(
                            <h1
                            className="text-3xl font-bold my-5 font-titleFont"
                            {...props}
                            />
                        ),
                        h2:(props: any)=>(
                            <h2
                            className="text-2xl font-bold my-5 font-titleFont"
                            {...props}
                            />
                        ),
                        h3:(props: any)=>(
                            <h3
                            className="text-2xl font-bold my-5 font-titleFont"
                            {...props}
                            />
                        ),
                        li: ({children}:any)=>(
                            <li className='ml-4 list-disc'>{children}</li>
                        ),
                        link : ({href , children}: any )=>(
                            <a href={href} className='text-cyan-500 hover:underline'>{children}</a>
                        ),                    
                    }}
                />
             </div>

            </article>
    <hr className='max-e-lg my-5 mx-auto border[1px] border-secondaryColor'/>

             {
                submitted ? <div className='flex flex-col items-center gap-2 
                p-10 my-10 bg-bgColor text-white mx-auto'>
                    <h1 className='text-2xl font-bold '>Thank you for submitting your comment </h1>
                    <p>Once it has been aproved , it will appear below</p>
                </div>: <div>
                <p className='text-xs text-secondaryColor uppercase
                font-titleFont font-bold' >Enjoyed This Articale?</p>
                <h3 className='font-titleFont text-3xl font-bold'>
                    Leave a comment below!</h3>
                <hr className='py-3 mt-2'/> 
                {/* form will start here */}
                {/* generating ID for hooks form */}
                <input {...register('_id')}
                type="hidden"
                name="_id"
                value={post._id}
                />
                <form onSubmit={handleSubmit(onSumbit)} className='mt-7 flex flex-col gp-6'>
                    <label className='flex flex-col' >
                        <span className='font-titleFont font-semibold text-base'>Name</span>
                        <input 
                        {...register("name", {required:true})}
                        className='text-base placeholder:text-sm border-b-[1px]
                        border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl
                        shadow-secondaryColor '
                        type="text" 
                        placeholder='Enter your name'/>

{
                            errors.name && (
                                <p className='text-sm font-titleFont font-semibold text-red-500 my-1 px-4'>
                                    <span className='text-base font-bold italic mr-2'>!</span>
                                    Name is required
                                </p>
                            )
                        }

                    </label>

                    <label className='flex flex-col' >
                        <span className='font-titleFont font-semibold text-base'>Email</span>
                        <input 
                         {...register("email", {required:true})}
                        className='text-base placeholder:text-sm border-b-[1px]
                        border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl
                        shadow-secondaryColor '
                        type="email" 
                        placeholder='Enter your Email'/>
                        {
                            errors.email && (
                                <p className='text-sm font-titleFont font-semibold text-red-500 my-1 px-4'>
                                    <span className='text-base font-bold italic mr-2'>!</span>
                                    Email is required
                                </p>
                            )
                        }
                    </label>

                    <label className='flex flex-col' >
                        <span className='font-titleFont font-semibold text-base'>
                        Comment</span>
                        <textarea 
                         {...register("comment", {required:true})} 
                        className='text-base placeholder:text-sm border-b-[1px]
                        border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl
                        shadow-secondaryColor '
               
                        placeholder='Enter your Comments'
                        rows={6}/>

{
                            errors.comment && (
                                <p className='text-sm font-titleFont font-semibold text-red-500 my-1 px-4'>
                                    <span className='text-base font-bold italic mr-2'>!</span>
                                    Comment is required
                                </p>
                            )
                        }

                    </label>

                    <button className=' w-will bg-bgColor text-white text-base
                    font-titleFont font-semibold tracking-wider uppercase
                    py-2 my-2 rounded-sm hover:bg-secondaryColor duration-300'
                    type='submit' >Submit</button>
                </form>
       

                    {/* <div className='w-full flex flex-col p-10 my-10 mx-10mx-auto shadow-bgColor
                    shadow-lg space-y-2'>
                        <h3 className='text-3xl font-titleFont font-semibold'>Comments</h3>
                        <hr />
                        {
                         post.comments.map((comment)=> ( 
                    
                            <div key={comment._id} >
                           
                                <p> <span>{comment.name}</span>{comment.comment}</p>
                            </div>
                            ))}  
                        
                    </div> */}


                                        <div className='w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2'>
                                        <h3 className='text-3xl font-titleFont font-semibold'>Comments</h3>
                                        <hr />
                                        {post.comments.map((Comment) => {
                                            // console.log(Comment) // Add this line to log each comment to the console
                                         
                                            return (
                                            <div key={Comment._id}>
                                                <p>
                                                <span className='text-secondaryColor'>{Comment.name}</span>{" "}{Comment.comment} 
                                                </p>
                                            </div>   
                                              )})}
                                        </div>;





             </div>  
             }     
        </div>

    <Footer/>
    </div>
  )
}

export default Post;

export const getStaticPaths = async () =>{
    const query = `*[_type == "post"]{
        _id,
        slug{
            current
        }
    }`;
    const posts = await sanityClient.fetch(query);
    const paths =posts.map((post: post) =>({
        params:{
            slug: post.slug.current,
        },
    }));
    return{
        paths,
        fallback:"blocking",
    };
};

// export const getStaticProps: GetStaticProps = async({params}) =>{
//     const query = `*[_type== "post" && slug.current == $slug][0]{
//         _id,
//           publishedAt,
//           title,
//           author ->{
//             name,
//             image,
//           },
//           "comments":*[_type == "comment" && post._ref== ^._id &&
//         approved == true] ,
//           description,
//           mainImage,
//           slug,
//           body  
//     }`
//     const post = await sanityClient.fetch(query,{
//         slug:params?.slug,
//     })

//        if(!post){
//         return{
//             notFound : true,

//         };
//        }
//        return {
//         props:{
//             post,
//         },
//         revalidate: 60,
//        };
// };
 



export const getStaticProps: GetStaticProps = async({params}) =>{
    const query = `*[_type== "post" && slug.current == $slug][0]{
        _id,
          publishedAt,
          title,
          author ->{
            name,
            image,
          },
          "comments":*[_type == "comment" && post._ref== ^._id],
          description,
          mainImage,
          slug,
          body  
    }`
    const post = await sanityClient.fetch(query,{
        slug:params?.slug,
        
    })

       if(!post){
        return{
            notFound : true,

        };
       }
       return {
        props:{
            post,
        },
        revalidate: 60,
       };
};