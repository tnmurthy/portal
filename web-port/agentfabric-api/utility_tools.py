def generate_email_signature(name: str, title: str, company: str, phone: str, email: str) -> str:
    """
    Generates a beautifully formatted HTML email signature block.

    Args:
        name (str): The person's full name.
        title (str): The person's job title.
        company (str): The company name.
        phone (str): The contact phone number.
        email (str): The contact email address.

    Returns:
        str: A string containing the HTML email signature.
    """
    html_signature = f"""
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; color: #333333;">
    <tr>
        <td style="padding-right: 20px; border-right: 2px solid #2563eb; vertical-align: middle;">
            <strong style="font-size: 18px; color: #111827; margin: 0;">{name}</strong><br>
            <span style="font-size: 14px; color: #4b5563;">{title}</span><br>
            <strong style="font-size: 14px; color: #2563eb;">{company}</strong>
        </td>
        <td style="padding-left: 20px; font-size: 13px; line-height: 1.6; vertical-align: middle;">
            <span style="color: #6b7280;">M:</span> <a href="tel:{phone}" style="color: #374151; text-decoration: none;">{phone}</a><br>
            <span style="color: #6b7280;">E:</span> <a href="mailto:{email}" style="color: #2563eb; text-decoration: none;">{email}</a>
        </td>
    </tr>
</table>
"""
    return html_signature.strip()
