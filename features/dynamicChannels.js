const settings = require('../settings.json');

module.exports= 
{
    async execute(oldState, newState)
    {
        if (oldState.channel != undefined && oldState.channel.parent != undefined && /\[.*\].*/.test(oldState.channel.name) )        // Member was in a channel before where it included dynamicness
        {
            var prefix = oldState.channel.name.slice(0,oldState.channel.name.lastIndexOf("]") + 1);
            var empty = countEmptyChannels(oldState.channel.parent, prefix); 

            // Delete a channel, there is more than one
            if(empty > 1)
            {
                deleteEmptyChannelWithPrefix(empty - 1, prefix, oldState.channel.parent);
            }
        } 
        if (newState.channel != undefined && newState.channel.parent != undefined && /\[.*\].*/.test(newState.channel.name) )
        {
            var prefix = newState.channel.name.slice(0,newState.channel.name.lastIndexOf("]") + 1);
            var empty = countEmptyChannels(newState.channel.parent, prefix); 
            // Add a new channel
            if(empty == 0)
            {
                var channelToClone = findChannelToClone(newState.channel.parent, prefix)
                cloneChannelAndMoveBelow(channelToClone);
            }
        }
    },   
};      

// counts the number of empty channels that contain the prefix provided that are under the provided parent
function countEmptyChannels(parent, prefix)
{
    var count = 0;
    parent.children.forEach(channel => {
        if(channel.name.includes(prefix) && channel.type == "voice" && channel.members.size == 0) 
        {
            count++;
        }
    });                
    return count;
}

// Deletes a channel(s), with provided prefix
function deleteEmptyChannelWithPrefix(empty, prefix, parent)
{
    parent.children.forEach(channel => {
        if(channel.name.includes(prefix) && channel.type == "voice" && channel.members.size == 0 && empty >= 1)
        {
            channel.delete().then(/* do nothing */).catch(console.error);
            empty--;
        }
    });
}

// Add a new channel by cloning the provided one (should be the last one in the list)
function cloneChannelAndMoveBelow(channelToClone)
{
    channelToClone.clone()
        .then(clone => {
            clone.setParent(channelToClone.parent)
                .then(clonedAndMoved => {
                    clonedAndMoved.setPosition(channelToClone.position+1)
                        .then(/* do nothing */)
                      .catch(console.error);
                })
                .catch(console.error);
            })
        .catch(console.error);
}

function findChannelToClone(parent, prefix)
{
    var lowestChannel;
    var lowestPosition = -1
    parent.children.forEach(channel => {
        if(channel.name.includes(prefix) && channel.type == "voice" && channel.position > lowestPosition)
        {
            lowestChannel = channel;
            lowestPosition = channel.position;
        }
    })
    return lowestChannel;
}