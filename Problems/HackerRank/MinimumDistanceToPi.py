min = 309814880690843
max = 309815865022793



from decimal import Decimal

PI = Decimal(3.1415926535897931797658451191693855162368)

def CompareFractionToPI(a, b):
    fraction = Decimal(a) / Decimal(b)
    difference = 0
    if PI > fraction:
        difference = PI - fraction
    else:
        difference = fraction - PI
    return difference

lowestDifference = [Decimal(1000), 1, 1] #difference, a, b
for b in range(min, max):
    piMultiplied = PI * b
    closestInteger = round(piMultiplied)

    difference = CompareFractionToPI(closestInteger, b)
    if (difference < lowestDifference[0]):
        lowestDifference[0] = difference
        lowestDifference[1] = closestInteger
        lowestDifference[2] = b

    if (b % 1000000 == 0):
        print(max - b)

print(lowestDifference)
print(f"{lowestDifference[1]}/{lowestDifference[2]}")
