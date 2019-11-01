json.body @message.body
json.image @message.image
json.user_id @message.user.id
json.user_name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")