# TradeSwap
URL: TBD 

Name: “TradeSwap" 
  

By: Abdelhalim Khaldi 

## Audience & Userstories: 
1. Anyone who wnats to trade something. 
2. Anyone who is looking to buy something.

## Data Model ERD

<<<<<<< HEAD
![image of ERD](https://github.com/golden22a/TradeSwap/blob/dev/images/ERD.png "wireframe")
=======
![image of wireframe](https://github.com/golden22a/TradeSwap/tree/master/images/tradeswap.png “wireframe”)
>>>>>>> fa1b1078054e3ef3a331d9674ce64248ac61b636

## MVP
User login / SignUp

User Post product

User like or dislike a product

MAtches


Validation

## Wireframes
![image of WIREFRAMES](https://github.com/golden22a/TradeSwap/blob/dev/images/login.png "wireframe")
![image of WIREFRAMES](https://github.com/golden22a/TradeSwap/blob/dev/images/signup.png "wireframe")
![image of WIREFRAMES](https://github.com/golden22a/TradeSwap/blob/dev/images/swipe.png "wireframe")
![image of WIREFRAMES](https://github.com/golden22a/TradeSwap/blob/dev/images/match.png "wireframe")
![image of WIREFRAMES](https://github.com/golden22a/TradeSwap/blob/dev/images/message.png "wireframe")


https://www.fluidui.com/editor/live/preview/cF9ScEJiM0I1VmtIWGNaWkhnS2ZGaVF0bjdINHhyTWlUVw==


## Springs

<<<<<<< HEAD
#### Spring 1:
-Learn about react native
### Spring 2:
-Setup a working environment on linux
### Spring 3:
- Create backend for basic auth
- Token auth

## Challenges :

- Setting up a working environment on linux

- React Native in general

-  Using relational conditions in a non relational db to filter data
## link

https://drive.google.com/file/d/1vx9bcEC8gtHCDesUXSZem_wvm-lhlRfw/view?usp=sharing


## Code :

```javascript
// Getting all the other users likes on items  except the current user
  Interest.find({ user: {$ne:req.user},interested:'true' }).populate('item').populate('user').exec((err,found)=>{

    if(err){
      res.status(500).json({error:err});
    } else{
      let match=null;
      // getting the users that matched one of the items the current user is trading
      let users = found.filter( x =>  x.item.user.toString() == req.user._id.toString() );
      // getting the info of the item 
      Post.findOne({_id:req.body.item}).populate('user').exec((err,post)=>{
        console.log(post
          //getting the matched user
         match=users.find((interest)=> interest.user._id.toString() == post.user._id.toString());

      
         if(!match || req.body.interested == false){
           console.log('its not a match',match);
           Interest.create({user:req.user,
             item:req.body.item,
               interested:req.body.interested},(err,created)=>{
             if(err){
               res.status(500).json({error:err});
             } else{
               console.log(created);
               res.status(200).json({message:created})
             }
           }
           )
         }else if(match){
           console.log('its a maatch');
           Interest.create({user:req.user,
             item:req.body.item,
               interested:req.body.interested},(err,created)=>{
             if(err){
               res.status(500).json({error:err});
             } else{

               Match.create({
                 user1:req.user,
                 user2:match.user,
                 item2:post,
                 item1:match.item,
                 title:`${post.title} &&  ${match.item.title} `
               },(err,matched)=>{
                 res.status(200).json({message:created,match:matched});
               })

             }
           }
           )

         }
      })

```

![image of WIREFRAMES](https://github.com/golden22a/TradeSwap/blob/dev/images/code.png "wireframe")
=======
#### Sprint 1: Basic login and signup
-When the user open the app he should see a login form and the app Logo ,Link to Signup

-User can login and Signup

-Be redirect to the Main page 

-See a navigation footer on all the pages to navigatre to deffirent parts

#### Bonus:
- make changes to there profile and preferences

### Sprint 2: Post a producte

 - User can post a product by filling up a form and providing a title and description
 
 - Add pictures to the product page 
 
 - CRUD on products
 
 ### Sprint 3 : Swip and Match :
 
 -User should be able to see all the available products with tilte,description and images
 
 _ User should be able to swip left for dislike and right for like
 
 _ notification incase of match.



>>>>>>> fa1b1078054e3ef3a331d9674ce64248ac61b636
