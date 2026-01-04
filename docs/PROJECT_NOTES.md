# World Canine Union - Project Notes

## 🎯 Stripe Coupons

/lib/stripe-
const session = await stripe.checkout.sessions.create({
customer_email: customerEmail,
line_items: [
{
price: WCU_REGISTRATION_PRICE_ID,
quantity: 1,
},
],
mode: "payment",
success_url: `${baseUrl}/register/success?session_id={CHECKOUT_SESSION_ID}`, // ← USE baseUrl
cancel_url: `${baseUrl}/`, // ← USE baseUrl
client_reference_id: registrationId,
allow_promotion_codes: true, // ← USE Allow coupon
metadata: {
registration_id: registrationId,
dog_name: dogName,
},

## 🎯 SQL for auto field population charter spotlight text

CREATE OR REPLACE FUNCTION set_charter_spotlight()
RETURNS TRIGGER AS $$
BEGIN
IF (
(SELECT COUNT(\*) FROM registrations WHERE status = 'completed') <= 500
AND NEW.status = 'completed'
) THEN
NEW.is_spotlight := TRUE;
NEW.spotlight_reason := 'Charter Member';
END IF;
RETURN NEW;
END;

$$
LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_charter_spotlight
  BEFORE INSERT OR UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION set_charter_spotlight();


**World Canine Union (WCU)** is a global digital registry that celebrates and memorializes all dogs—especially mixed breeds and rescues. Unlike traditional pedigree clubs, WCU provides inclusive recognition, official registration certificates, and a permanent digital legacy from registration through memorialization.

## 🌐 Platform Overview

A comprehensive Next.js platform featuring:
$$
