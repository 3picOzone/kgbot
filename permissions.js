module.exports= 
{
    execute(message, requiredRoles)
    {
        for(role in requiredRoles)
        {
            if (message.member.roles.exists("name", role)) return true;
        }
        return false;
    },   
};      
